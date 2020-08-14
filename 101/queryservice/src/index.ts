import express, { Request, Response } from "express";
import bodyparser from "body-parser";
import cors from "cors";
import { Event, PostWithComments } from "sharedtypes/Types";
import {
  isPostPostEvent,
  isPostCommentEvent,
  isCommentUpdated,
} from "sharedtypes/TypeGuards";
import axios, { AxiosResponse } from "axios";
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
const handleEvent = (event: Event) => {
  if (isPostPostEvent(event)) {
    const { id, title } = event.data;
    posts[id] = { id, title, comments: [] };
    console.log("new Post");
  }
  if (isPostCommentEvent(event)) {
    const { id, content, status, postId } = event.data;
    posts[postId].comments.push({ id, content, status });
    console.log("new Comment");
  }
  if (isCommentUpdated(event)) {
    const { id, content, status, postId } = event.data;
    const comment = posts[postId].comments.find((c) => c.id === id);
    comment!.status = status;
    comment!.content = content;
    console.log("Comment updated eeeweiji243234j243gzgjjr");
  }
};
app.post("/events", (req: Request<{}, {}, Event>, res) => {
  handleEvent(req.body);
  res.send({});
});

app.listen(4002, async () => {
  console.log("QueryServive is running on 4002");
  try {
    const events = await axios.get<any, AxiosResponse<Event[]>>(
      "http://eventbus-srv:4005/events"
    );
    events.data.forEach((event) => {
      handleEvent(event);
    });
  } catch (error) {}
});
