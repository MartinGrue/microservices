import express, { Request, Response } from "express";
import { randomBytes } from "crypto";
import bodyparser from "body-parser";
import cors from "cors";
import axios, { AxiosInstance } from "../../shared/custom.typings";
import { Comment, PostCommentEvent, PostPostEvent } from "../../shared/Types";
const app = express();
app.use(bodyparser.json());
app.use(cors());

const commentsByPostId: { [key: string]: Comment[] } = {};

app.get(
  "/posts/:id/comments",
  (req: Request<{ id: string }, {}, {}>, res: Response<Comment[]>) => {
    const comments = commentsByPostId[req.params.id] || [];
    return res.send(comments);
  }
);

app.post(
  "/posts/:id/comments",
  async (
    req: Request<{ id: string }, {}, { content: string }>,
    res: Response<Comment[]>
  ) => {
    const commentId = randomBytes(4).toString("hex");
    const { content } = req.body;
    const comments = commentsByPostId[req.params.id] || [];
    comments.push({ id: commentId, content, status: "pending" });
    commentsByPostId[req.params.id] = comments;
    await axios.post<any, any, PostCommentEvent>(
      "http://localhost:4005/events",
      {
        type: "CommentCreated",
        data: {
          id: commentId,
          content,
          postId: req.params.id,
          status: "pending",
        },
      }
    );
    return res.status(201).send(comments);
  }
);
app.post(
  "/events",
  (req: Request<{}, {}, PostCommentEvent | PostPostEvent>, res) => {
    console.log("Event received", req.body);
  }
);
app.listen(2001, () => {});
