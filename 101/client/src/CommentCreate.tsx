import React, { useState } from "react";
import axios from "axios";

interface CommentCreateProps {
  postId: string;
}
const CommentCreate: React.FC<CommentCreateProps> = ({ postId }) => {
  const [content, setcontent] = useState("");
  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await axios.post(`http://posts.com/posts/${postId}/comments`, {
      content,
    });
    setcontent("");
  };
  return (
    <div>
      <form onSubmit={(e) => onSubmit(e)}>
        <div className="form-group">
          <label className="">New Comment</label>
          <input
            value={content}
            className="form-control"
            onChange={(e) => {
              setcontent(e.target.value);
            }}
          ></input>
        </div>
        <button className="btn btn-primary">Create Comment</button>
      </form>
    </div>
  );
};

export default CommentCreate;
