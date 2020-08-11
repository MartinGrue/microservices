import express, { Request, Response } from "express";
import bodyparser from "body-parser";
import cors from "cors";
import { Event, PostWithComments } from "../../shared/Types";
import {
  isPostPostEvent,
  isPostCommentEvent,
  isCommentUpdated,
} from "../../shared/TypeGuards";
const app = express();
app.use(bodyparser.json());
app.use(cors());

const posts: { [key: string]: PostWithComments } = {};
app.get(
  "/posts",
  (
    req,
    res: Response<{
      [key: string]: PostWithComments;
    }>
  ) => {
    res.send(posts);
  }
);
app.post("/events", (req: Request<{}, {}, Event>, res) => {
  if (isPostPostEvent(req.body)) {
    const { id, title } = req.body.data;
    posts[id] = { id, title, comments: [] };
    console.log("new Post");
  }
  if (isPostCommentEvent(req.body)) {
    const { id, content, status, postId } = req.body.data;
    posts[postId].comments.push({ id, content, status });
    console.log("new Comment");
  }
  if (isCommentUpdated(req.body)) {
    const { id, content, status, postId } = req.body.data;
    const comment = posts[postId].comments.find((c) => c.id === id);
    comment!.status = status;
    comment!.content = content;
    console.log("Comment updated");
  }
  console.log(posts);
  res.send({});
});

app.listen(4002, () => {
  console.log("QueryServive is running on 4002");
});
