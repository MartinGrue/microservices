import express, { Request, Response } from "express";
import { randomBytes } from "crypto";
import bodyparser from "body-parser";
import axios from "axios";
import cors from "cors";
import { Post, PostCommentEvent, PostPostEvent } from "../../shared/Types";

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

app.post("/posts", async (req: Request<{}, {}, { title: string }>, res) => {
  const id = randomBytes(4).toString("hex");
  const { title } = req.body;
  posts[id] = { id, title };
  await axios.post("http://localhost:4005/events", {
    type: "PostCreated",
    data: { id, title } as Post,
  });
  return res.status(201).send(posts[id]);
});
app.post(
  "/events",
  (req: Request<{}, {}, PostCommentEvent | PostPostEvent>, res) => {
    console.log("Event received", req.body);
  }
);
app.listen(2002, () => {});
