package main

import (
	"context"
	"flag"
	"fmt"
	"github.com/rs/cors"
	"log"
	"net/http"
	"sort"
	"sync"

	"golang.org/x/net/http2"
	"golang.org/x/net/http2/h2c"

	"github.com/bufbuild/connect-go"
	"github.com/google/uuid"
	v1 "github.com/syumai/emotter/api/gen/emotter/v1"
	"github.com/syumai/emotter/api/gen/emotter/v1/emotterv1connect"
	"google.golang.org/protobuf/types/known/timestamppb"
)

var port = flag.Int("port", 8080, "e.g. 8080")

type EmotterServer struct{}

var _ emotterv1connect.EmotterServiceHandler = &EmotterServer{}

var store sync.Map

func storePost(post *v1.Post) {
	store.Store(post.Id, post)
}

func loadPost(id string) (post *v1.Post, ok bool) {
	v, ok := store.Load(id)
	if !ok {
		return nil, false
	}
	return v.(*v1.Post), true
}

func loadAllPosts(asc bool) []*v1.Post {
	var posts []*v1.Post
	store.Range(func(key, value any) bool {
		posts = append(posts, value.(*v1.Post))
		return true
	})
	sort.Slice(posts, func(i, j int) bool {
		if !asc {
			i, j = j, i
		}
		return posts[i].CreateTime.AsTime().Before(posts[j].CreateTime.AsTime())
	})
	return posts
}

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
