import "./Posts.css";
import {
  useCreatePostMutation,
  useListPostsQuery,
  useRefetchListPostsQuery,
} from "./hooks";
import { FC, useCallback } from "react";
import { Post } from "../gen/emotter/v1/emotter_pb";

const PostForm: FC = () => {
  const refetchListPosts = useRefetchListPostsQuery();
  const { mutate, error } = useCreatePostMutation({
    onSuccess: () => refetchListPosts(),
  });

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = useCallback(
    (event) => {
      event.preventDefault();
      const formData = new FormData(event.currentTarget);
      mutate(Object.fromEntries(formData.entries()));
      (event.currentTarget.emoji as HTMLInputElement).value = "";
    },
    [mutate]
  );
  return (
    <form className="box" onSubmit={handleSubmit}>
      <div className="field">
        <label className="label" htmlFor="userName">
          name
        </label>
        <div className="control">
          <input
            id="userName"
            className="input"
            type="text"
            name="userName"
            maxLength={20}
            required
          ></input>
        </div>
      </div>
      <div className="field">
        <label className="label" htmlFor="emoji">
          emoji
        </label>
        <div className="control">
          <input
            id="emoji"
            className="input"
            type="text"
            name="emoji"
            required
          ></input>
        </div>
      </div>
      <div className="field">
        <div className="control">
          <button className="button is-link">Create Post</button>
        </div>
      </div>
      {error && <div className="notification is-danger">{error.message}</div>}
    </form>
  );
};

const PostCard: FC<{ post: Post }> = ({
  post: { userName, createTime, emoji },
}) => (
  <div className="block">
    <div className="card">
      <div className="card-content">
        <div className="media">
          <div className="media-content">
            <p className="title is-6">{userName}</p>
            <p className="subtitle is-6">
              {createTime?.toDate().toLocaleString()}
            </p>
          </div>
        </div>
        <div className="content" style={{ fontSize: "3rem" }}>
          {emoji}
        </div>
      </div>
    </div>
  </div>
);

export const Posts: FC = () => {
  const { data } = useListPostsQuery({});
  return (
    <section className="section">
      <PostForm />
      <hr />
      {data?.posts.map((post) => (
        <PostCard post={post} key={post.id} />
      ))}
    </section>
  );
};
