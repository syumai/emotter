package main

import (
	"context"
	"errors"

	"github.com/bufbuild/connect-go"
	"github.com/google/uuid"
	v1 "github.com/syumai/emotter/api/gen/emotter/v1"
	"github.com/syumai/emotter/api/gen/emotter/v1/emotterv1connect"
	"google.golang.org/protobuf/types/known/timestamppb"
)

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
	_ context.Context,
	req *connect.Request[v1.ListPostsRequest],
) (*connect.Response[v1.ListPostsResponse], error) {
	return connect.NewResponse(&v1.ListPostsResponse{
		Posts: loadAllPosts(false),
	}), nil
}
