package main

import (
	"context"
	"flag"
	"fmt"
	"log"
	"net/http"

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
	err := http.ListenAndServe(
		fmt.Sprintf(":%d", *port),
		cors.Default().Handler(h2c.NewHandler(mux, &http2.Server{})),
	)
	if err != nil {
		log.Fatal(err)
	}
}
