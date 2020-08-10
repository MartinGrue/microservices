import express, { Request } from "express";
import bodyparser from "body-parser";
import axios from "axios";
import { PostPostEvent, PostCommentEvent } from "../../shared/Types";
interface PostCommentEventData extends comment {
  postId: string;
}
interface comment {
  id: string;
  content: string;
}

const app = express();
app.use(bodyparser.json());

app.post(
  "/events",
  (req: Request<{}, {}, PostPostEvent | PostCommentEvent>, res) => {
    const event = req.body;
    axios.post("http://localhost:4002/events", event);
    axios.post("http://localhost:2001/events", event);
    axios.post("http://localhost:2002/events", event);
    console.log("Event fired", event);
    res.send({ status: "OK" });
  }
);
app.listen(4005, () => {
  console.log("bus listening on 4005");
});
