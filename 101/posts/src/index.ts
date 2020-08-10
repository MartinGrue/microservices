import express, { Request } from "express";
import { randomBytes } from "crypto";
import bodyparser from "body-parser";
const app = express();
app.use(bodyparser.json());
interface post {
  id: string;
  title: string;
}
const posts: { [key: string]: post } = {};

app.get("/posts", (req, res) => {
  return res.send(posts);
});

app.post("/posts", (req: Request<{}, {}, post>, res) => {
  const id = randomBytes(4).toString("hex");
  const { title } = req.body;
  posts[id] = { id, title };
  return res.status(201).send(posts[id]);
});

app.listen(2002, () => {});
