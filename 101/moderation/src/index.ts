import express, { Request, Response } from "express";
import bodyparser from "body-parser";
import axios from "axios";

const app = express();
app.use(bodyparser.json());

app.post("/events", (req: Request<{}, {}, {}>, res: Response<{}>) => {
  return res.send();
});

app.listen(2003, () => {});
