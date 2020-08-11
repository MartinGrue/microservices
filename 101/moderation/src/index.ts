import express, { Request, Response } from "express";
import bodyparser from "body-parser";
import axios from "axios";
import { Event, CommentModerated } from "../../shared/Types";
import { isPostCommentEvent } from "../../shared/TypeGuards";

const app = express();
app.use(bodyparser.json());

app.post("/events", async (req: Request<{}, {}, Event>, res: Response<{}>) => {
  if (isPostCommentEvent(req.body)) {
    const status = req.body.data.content.includes("orange")
      ? "rejected"
      : "approved";
    const { id, content, postId } = req.body.data;
    await axios.post<any, any, CommentModerated>(
      "http://localhost:4005/events",
      {
        type: "CommentModerated",
        data: {
          id,
          content,
          postId,
          status,
        },
      }
    );
  }
  return res.send();
});

app.listen(2003, () => {});
