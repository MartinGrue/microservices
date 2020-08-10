import express, { Request, Response } from "express";
import { randomBytes } from "crypto";
import bodyparser from "body-parser";
import cors from "cors";
const app = express();
app.use(bodyparser.json());
app.use(cors());

interface comment {
  id: string;
  content: string;
}
const commentsByPostId: { [key: string]: comment[] } = {};

app.get(
  "/posts/:id/comments",
  (req: Request<{ id: string }, {}, {}>, res: Response<comment[]>) => {
    const comments = commentsByPostId[req.params.id] || [];
    return res.send(comments);
  }
);

app.post(
  "/posts/:id/comments",
  (
    req: Request<{ id: string }, {}, { content: string }>,
    res: Response<comment[]>
  ) => {
    const commentId = randomBytes(4).toString("hex");
    const { content } = req.body;
    const comments = commentsByPostId[req.params.id] || [];
    comments.push({ id: commentId, content });
    commentsByPostId[req.params.id] = comments;
    return res.status(201).send(comments);
  }
);

app.listen(2001, () => {});
