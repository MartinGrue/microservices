import express, { Request, Response } from "express";
import bodyparser from "body-parser";
import axios from "axios";
import { Event, CommentModerated } from "sharedtypes/Types";
import { isPostCommentEvent } from "sharedtypes/TypeGuards";

const app = express();
app.use(bodyparser.json());

app.post("/events", async (req: Request<{}, {}, Event>, res: Response<{}>) => {
  if (isPostCommentEvent(req.body)) {
    const status = req.body.data.content.includes("orange")
      ? "rejected"
      : "approved";
    const { id, content, postId } = req.body.data;
    await axios.post<any, any, CommentModerated>(
      "http://eventbus-srv:4005/events",
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
  console.log("Event received", req.body);
});

app.listen(2003, () => {
  console.log("Moderation Service running on 2003");
});
