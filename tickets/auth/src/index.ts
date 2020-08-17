import express from "express";
import { json } from "body-parser";
import { currentUserRouter } from "./routes/currentuser";
import { signinRouter } from "./routes/signin";
import { signoutRouter } from "./routes/signout";
import { signupRouter } from "./routes/signup";
import { errorHandler } from "./middleware/error-handler";
import mongoose from "mongoose";
import cookieSession from "cookie-session";

const app = express();
app.set("trust proxy", true);
app.use(json());
app.use(cookieSession({ signed: false, secure: false }));
app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

app.use(errorHandler);
app.get("/api/users/currentuser", (req, res) => {
  res.send("hi there");
});
const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error("JWT_KEY is not defined");
  }
  try {
    await mongoose.connect("mongodb://auth-mongo-srv:27017/auth", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log("Connected to mongodb");
  } catch (error) {
    console.log(error);
  }
  app.listen(4000, () => {
    console.log("auth listening on 4000");
  });
};
start();
