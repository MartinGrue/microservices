import React from "react";
import { Comment } from "../../shared/Types";

interface CommentListProps {
  comments: Comment[];
}

const CommentList: React.FC<CommentListProps> = ({ comments }) => {
  return (
    <div>
      <h1>Comment List</h1>
      <ul>
        {comments.map((comment) => {
          return (
            <div key={comment.id}>
              <hr></hr>
              <li>{comment.id}</li>
              <li>{comment.content}</li>
            </div>
          );
        })}
      </ul>
    </div>
  );
};

export default CommentList;
