package main

import (
	"sort"
	"sync"

	v1 "github.com/syumai/emotter/api/gen/emotter/v1"
)

const maxPostsLength = 30

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
	return posts[:maxPostsLength]
}
