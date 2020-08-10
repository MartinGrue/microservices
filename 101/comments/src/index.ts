import express from "express";
const app = express();
app.get("/", (req, res) => {
  return res.send("Hello from comments");
});
app.listen(2001, () => {});
