import React, { useState, useEffect } from "react";
import axios, { AxiosResponse } from "axios";
import CommentCreate from "./CommentCreate";
import CommentList from "./CommentList";
import { PostWithComments } from "sharedtypes/Types";

const PostList = () => {
  const fetchPosts = async (): Promise<{ [key: string]: PostWithComments }> => {
    const posts = await axios.get<
      any,
      AxiosResponse<{ [key: string]: PostWithComments }>
    >("http://posts.com/posts");
    return posts.data;
  };
  useEffect(() => {
    fetchPosts().then((res) => setpostList(res));
  }, []);
  const [postList, setpostList] = useState<{ [key: string]: PostWithComments }>(
    {}
  );
  return (
    <div className="container">
      <h1>Posts</h1>
      <div className="card-group">
        {postList &&
          Object.values(postList).map((post) => {
            return (
              <div
                className="card"
                style={{ width: "30%", marginBottom: "20px" }}
                key={post.id}
              >
                <div className="card-body">
                  <p>{`post id: ${post.id}`}</p>
                  <p>{`post title: ${post.title}`}</p>
                  <CommentList comments={post.comments}></CommentList>
                  <CommentCreate postId={post.id}></CommentCreate>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default PostList;
