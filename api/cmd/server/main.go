package main

import (
	"context"
	"errors"
	"flag"
	"fmt"
	"log"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	"github.com/bufbuild/connect-go"
	"github.com/google/uuid"
	"github.com/rs/cors"
	v1 "github.com/syumai/emotter/api/gen/emotter/v1"
	"github.com/syumai/emotter/api/gen/emotter/v1/emotterv1connect"
	"golang.org/x/net/http2"
	"golang.org/x/net/http2/h2c"
	"google.golang.org/protobuf/types/known/timestamppb"
)

var port = flag.Int("port", 8080, "e.g. 8080")

type EmotterServer struct{}

var _ emotterv1connect.EmotterServiceHandler = &EmotterServer{}

func (e EmotterServer) CreatePost(
	ctx context.Context,
	req *connect.Request[v1.CreatePostRequest],
) (*connect.Response[v1.CreatePostResponse], error) {
	userName := req.Msg.GetUserName()
	if len(userName) > 20 {
		return nil, connect.NewError(connect.CodeInvalidArgument, errors.New("user name is too long"))
	}
	emoji := req.Msg.GetEmoji()
	if !validateIsEmoji(emoji) {
		return nil, connect.NewError(connect.CodeInvalidArgument, errors.New("input is not emoji"))
	}
	post := &v1.Post{
		Id:         uuid.NewString(),
		UserName:   req.Msg.GetUserName(),
		Emoji:      req.Msg.GetEmoji(),
		CreateTime: timestamppb.Now(),
	}
	storePost(post)
	return connect.NewResponse(&v1.CreatePostResponse{
		Post: post,
	}), nil
}

func (e EmotterServer) ListPosts(
	context.Context,
	*connect.Request[v1.ListPostsRequest],
) (*connect.Response[v1.ListPostsResponse], error) {
	return connect.NewResponse(&v1.ListPostsResponse{
		Posts: loadAllPosts(false),
	}), nil
}

func main() {
	flag.Parse()
	srv := &EmotterServer{}
	mux := http.NewServeMux()
	path, handler := emotterv1connect.NewEmotterServiceHandler(srv)
	mux.Handle(path, handler)

	ctx, stop := signal.NotifyContext(context.Background(), os.Interrupt, syscall.SIGTERM)
	defer stop()

	addr := fmt.Sprintf(":%d", *port)
	s := http.Server{
		Addr:              addr,
		Handler:           cors.Default().Handler(h2c.NewHandler(mux, &http2.Server{})),
		ReadHeaderTimeout: time.Second,
		ReadTimeout:       5 * time.Minute,
		WriteTimeout:      5 * time.Minute,
		MaxHeaderBytes:    8 * 1024, // 8KiB
	}

	go func() {
		<-ctx.Done()
		ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
		defer cancel()
		s.Shutdown(ctx)
	}()

	fmt.Printf("listening server on %s\n", addr)
	if err := s.ListenAndServe(); !errors.Is(err, http.ErrServerClosed) {
		log.Fatal(err)
	}
}
