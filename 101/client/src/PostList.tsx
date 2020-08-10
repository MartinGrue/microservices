import React, { useState, useEffect } from "react";
import axios, { AxiosResponse } from "axios";
interface post {
  id: string;
  title: string;
}
interface Posts {
  [key: string]: post;
}

const PostList = () => {
  const fetchPosts = async (): Promise<Posts> => {
    const posts = await axios.get<any, AxiosResponse<Posts>>(
      "http://localhost:2002/posts"
    );

    return posts.data;
  };
  useEffect(() => {
    fetchPosts().then((res) => setpostList(res));
  }, []);
  const [postList, setpostList] = useState<Posts>({});
  return (
    <div className="container">
      <h1>Post List</h1>
      {postList &&
        Object.values(postList).map((post) => {
          return (
            <div
              className="card"
              style={{ width: "30%", marginBottom: "20px" }}
              key={post.id}
            >
              <div className="card-body">
                {" "}
                <p>{`post id: ${post.id}`}</p>
                <p>{`post title: ${post.title}`}</p>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default PostList;
