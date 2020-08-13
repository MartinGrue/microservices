import express, { Request, Response } from "express";
import { randomBytes } from "crypto";
import bodyparser from "body-parser";
import cors from "cors";
import axios from "axios";
import {
  Comment,
  PostCommentEvent,
  Event,
  CommentModerated,
  CommentUpdated,
} from "sharedtypes/Types";
import { isCommentModerated } from "sharedtypes/TypeGuards";
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
      "http://eventbus-srv:4005/events",
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
app.post("/events", async (req: Request<{}, {}, Event>, res) => {
  if (isCommentModerated(req.body)) {
    const { postId, id, status } = req.body.data;
    const comment = commentsByPostId[postId].find((c) => c.id === id);
    comment!.status = status;
    await axios.post<any, any, CommentUpdated>(
      "http://eventbus-srv:4005/events",
      {
        type: "CommentUpdated",
        data: {
          ...comment!,
          postId,
        },
      }
    );
  }
  console.log("Event received", req.body);
});
app.listen(2001, () => {
  console.log("Comments Service running on 2001");
});
