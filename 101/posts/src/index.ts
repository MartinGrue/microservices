import express, { Request, Response } from "express";
import { randomBytes } from "crypto";
import bodyparser from "body-parser";
import axios from "axios";
import cors from "cors";
import { Post, Event, PostPostEvent } from "sharedtypes/Types";

const app = express();
app.use(bodyparser.json());
app.use(cors());

const posts: { [key: string]: Post } = {};

app.get(
  "/posts",
  (
    req: Request,
    res: Response<{
      [key: string]: Post;
    }>
  ) => {
    return res.send(posts);
  }
);

app.post("/posts/create", async (req: Request<{}, {}, { title: string }>, res) => {
  const id = randomBytes(4).toString("hex");
  const { title } = req.body;
  posts[id] = { id, title };
  await axios.post<any, any, PostPostEvent>("http://eventbus-srv:4005/events", {
    type: "PostCreated",
    data: { id, title },
  });
  return res.status(201).send(posts[id]);
});
app.post("/events", (req: Request<{}, {}, Event>, res) => {
  console.log("Event received", req.body);
});
app.listen(2002, () => {
  console.log("Posts Service running on 2002");
});
