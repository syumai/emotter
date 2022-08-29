import "./App.css";
import { useCreatePostMutation, useListPosts } from "./hooks";
import {
  CreatePostRequest,
  ListPostsRequest,
} from "../gen/emotter/v1/emotter_pb";
import React, { useCallback } from "react";
import { useSWRConfig } from "swr";

function App() {
  const { data: listPostsData, error: listPostsError } = useListPosts({});
  const { mutate } = useSWRConfig();
  const onCompleteCreatePost = useCallback(() => {
    mutate({});
  }, [mutate]);
  const [
    createPost,
    { data: createPostData, error: createPostError, loading },
  ] = useCreatePostMutation({
    onCompleted: onCompleteCreatePost,
  });
  const onSubmitForm: React.FormEventHandler<HTMLFormElement> = useCallback(
    (event) => {
      event.preventDefault();
      const formData = new FormData(event.currentTarget);
      const userName = formData.get("userName")?.toString() ?? "";
      const emoji = formData.get("emoji")?.toString() ?? "";
      createPost({ userName, emoji });
    },
    []
  );
  return (
    <div className="App">
      <div className="posts">
        {listPostsData &&
          listPostsData.posts.map(({ id, userName, emoji }) => (
            <div className="post" key={id}>
              <div className="field">id: {id}</div>
              <div className="field">userName: {userName}</div>
              <div className="field">emoji: {emoji}</div>
            </div>
          ))}
      </div>
      <form onSubmit={onSubmitForm}>
        <div>
          <label htmlFor="userName">userName</label>
          <input id="userName" type="text" name="userName" required></input>
        </div>
        <div>
          <label htmlFor="emoji">emoji</label>
          <input id="emoji" type="text" name="emoji" required></input>
        </div>
        <button>Create Post</button>
      </form>
    </div>
  );
}

export default App;
