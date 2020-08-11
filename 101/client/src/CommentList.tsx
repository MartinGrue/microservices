import React from "react";
import { Comment } from "sharedtypes/Types"

interface CommentListProps {
  comments: Comment[];
}

const CommentList: React.FC<CommentListProps> = ({ comments }) => {
  return (
    <div>
      <h1>Comment List</h1>
      <ul>
        {comments.map((comment) => {
          const content =
            comment.status === "approved"
              ? comment.content
              : comment.status === "pending"
              ? "Your content is beeing moderated please wait"
              : comment.status === "rejected"
              ? "Your content has been rejected"
              : null;

          return (
            <div key={comment.id}>
              <hr></hr>
              <li>{comment.id}</li>
              <li>{content}</li>
            </div>
          );
        })}
      </ul>
    </div>
  );
};

export default CommentList;
