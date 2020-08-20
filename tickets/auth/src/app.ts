import express from "express";
import { json } from "body-parser";
import { currentUserRouter } from "./routes/currentuser";
import { signinRouter } from "./routes/signin";
import { signoutRouter } from "./routes/signout";
import { signupRouter } from "./routes/signup";
import { errorHandler } from "./middleware/error-handler";
import cookieSession from "cookie-session";
const app = express();
//process.env.NODE_ENV !== "test"
app.set("trust proxy", true);
app.use(json());
app.use(cookieSession({ signed: false, secure: false }));
app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);
app.use(errorHandler);
export default app;
