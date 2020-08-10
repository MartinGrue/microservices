import express from "express";
import bodyparser from "body-parser";
import axios from "axios";
const app = express();
app.use(bodyparser.json());

app.post("/events", (req, res) => {
  const event = req.body;
  axios.post("http://localhost:2000/events", event);
  axios.post("http://localhost:2001/events", event);
  axios.post("http://localhost:2002/events", event);
  res.send({ status: "OK" });
});
app.listen(4005, () => {console.log("bus listening on 4005")})