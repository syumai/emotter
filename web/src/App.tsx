import "./App.css";
import {
  useCreatePostMutation,
  useInvalidateListPostsQuery,
  useListPosts,
} from "./hooks";
import React, { useCallback } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function Posts() {
  const { data: listPostsData, error: listPostsError } = useListPosts({});
  const invalidateListPosts = useInvalidateListPostsQuery();
  const { mutate } = useCreatePostMutation({ onSuccess: invalidateListPosts });
  const onSubmitForm: React.FormEventHandler<HTMLFormElement> = useCallback(
    (event) => {
      event.preventDefault();
      const formData = new FormData(event.currentTarget);
      const userName = formData.get("userName")?.toString() ?? "";
      const emoji = formData.get("emoji")?.toString() ?? "";
      mutate({ userName, emoji });
    },
    []
  );
  return (
    <>
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
    </>
  );
}

const queryClient = new QueryClient();

function App() {
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <Posts />
      </QueryClientProvider>
    </div>
  );
}

export default App;
