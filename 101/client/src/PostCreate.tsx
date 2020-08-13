import React, { useState } from "react";
import axios from "axios";

export default () => {
  const [title, settitle] = useState("");
  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await axios.post("http://posts.com/posts/create", { title });
    settitle("");
  };
  return (
    <div className="container">
      <p>Create a new Post</p>
      <form onSubmit={(e) => onSubmit(e)}>
        <div className="form-group">
          <label></label>
          <input
            className="form-control"
            value={title}
            onChange={(e) => settitle(e.target.value)}
          ></input>
        </div>
        <button className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};
