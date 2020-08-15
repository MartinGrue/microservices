import express from "express";
import { json } from "body-parser";
import { currentUserRouter } from "./routes/currentuser";
import { signinRouter } from "./routes/signin";
import { signoutRouter } from "./routes/signout";
import { signupRouter } from "./routes/signup";
import { errorHandler } from "./middleware/error-handler";
const app = express();

app.use(json());
app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

app.use(errorHandler);
app.get("/api/users/currentuser", (req, res) => {
  res.send("hi there");
});
app.listen(4000, () => {
  console.log("auth listening on 4000");
});
