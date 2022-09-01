import "./Posts.css";
import {
  useCreatePostMutation,
  useInvalidateListPostsQuery,
  useListPosts,
} from "./hooks";
import { FC, useCallback } from "react";

export const Posts: FC = () => {
  const { data } = useListPosts({});
  const invalidateListPosts = useInvalidateListPostsQuery();
  const { mutate } = useCreatePostMutation({ onSuccess: invalidateListPosts });

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = useCallback(
    (event) => {
      event.preventDefault();
      const formData = new FormData(event.currentTarget);
      const userName = formData.get("userName")?.toString() ?? "";
      const emoji = formData.get("emoji")?.toString() ?? "";
      mutate({ userName, emoji });
    },
    [mutate]
  );
  return (
    <>
      <form onSubmit={handleSubmit}>
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
      <hr />
      <div className="posts">
        {data &&
          data.posts.map(({ id, userName, emoji }) => (
            <div className="post" key={id}>
              <div className="field">id: {id}</div>
              <div className="field">userName: {userName}</div>
              <div className="field">emoji: {emoji}</div>
            </div>
          ))}
      </div>
    </>
  );
};
