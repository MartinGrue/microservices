import React from "react";
import "./App.css";
import PostCreate from "./PostCreate";
import PostList from "./PostList";

function App() {
  return (
    <div>
      <PostCreate></PostCreate>
      <hr></hr>
      <PostList></PostList>
    </div>
  );
}

export default App;
