import express, { Request } from "express";
import { randomBytes } from "crypto";
import bodyparser from "body-parser";
import cors from "cors"
const app = express();
app.use(bodyparser.json());
app.use(cors())
interface post {
  id: string;
  title: string;
}
const posts: { [key: string]: post } = {};

app.get("/posts", (req, res) => {
  return res.send(posts);
});

app.post("/posts", (req: Request<{}, {}, { title: string }>, res) => {
  const id = randomBytes(4).toString("hex");
  const { title } = req.body;
  posts[id] = { id, title };
  return res.status(201).send(posts[id]);
});

app.listen(2002, () => {});
