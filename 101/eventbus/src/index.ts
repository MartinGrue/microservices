import express, { Request, Response } from "express";
import bodyparser from "body-parser";
import axios from "axios";
import { Event } from "sharedtypes/Types"

const app = express();
const events: Event[] = [];
app.use(bodyparser.json());

app.post("/events", (req: Request<{}, {}, Event>, res) => {
  const event = req.body;
  events.push(event);
  axios.post<any, any, Event>("http://query-srv:4002/events", event);
  axios.post<any, any, Event>("http://comments-srv:2001/events", event);
  axios.post<any, any, Event>("http://posts-clusterip-srv:2002/events", event);
  axios.post<any, any, Event>("http://moderation-srv:2003/events", event);

  console.log("Event fired", event);
  res.send({ status: "OK" });
});
app.get("/events", (req, res: Response<Event[]>) => {
  res.send(events);
});
app.listen(4005, () => {
  console.log("bus running on 4005");
});
