import React, { useState, useEffect } from "react";
import axios, { AxiosResponse } from "axios";
interface CommentListProps {
  postId: string;
}
interface comment {
  id: string;
  content: string;
}
const CommentList: React.FC<CommentListProps> = ({ postId }) => {
  const [comments, setcomments] = useState<comment[]>([]);
  const fetchComments = async (): Promise<comment[]> => {
    const posts = await axios.get<any, AxiosResponse<comment[]>>(
      `http://localhost:2001/posts/${postId}/comments`
    );
    return posts.data;
  };
  useEffect(() => {
    fetchComments().then((res) => setcomments(res));
  }, []);
  return (
    <div>
      <h1>Comment List</h1>
      <ul>
        {comments.map((comment) => {
          return <li key={comment.id}>{comment.content}</li>;
        })}
      </ul>
    </div>
  );
};

export default CommentList;
