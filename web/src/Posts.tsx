import "./Posts.css";
import {
  useCreatePostMutation,
  useInvalidateListPostsQuery,
  useListPosts,
} from "./hooks";
import { FC, useCallback } from "react";
import { Post } from "../gen/emotter/v1/emotter_pb";

const PostForm: FC = () => {
  const invalidateListPosts = useInvalidateListPostsQuery();
  const { mutate } = useCreatePostMutation({ onSuccess: invalidateListPosts });

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = useCallback(
    (event) => {
      event.preventDefault();
      const formData = new FormData(event.currentTarget);
      mutate(Object.fromEntries(formData.entries()));
      event.currentTarget.reset();
    },
    [mutate]
  );
  return (
    <form onSubmit={handleSubmit}>
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
            <p className="title is-4">{userName}</p>
            <p className="subtitle is-6">
              {createTime?.toDate().toLocaleString()}
            </p>
          </div>
        </div>
        <div className="content">{emoji}</div>
      </div>
    </div>
  </div>
);

export const Posts: FC = () => {
  const { data } = useListPosts({});
  return (
    <>
      <PostForm />
      <hr />
      {data?.posts.map((post) => (
        <PostCard post={post} key={post.id} />
      ))}
    </>
  );
};
