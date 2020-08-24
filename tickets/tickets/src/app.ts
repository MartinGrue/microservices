import express from "express";
import { json } from "body-parser";

import { errorHandler } from "@scope/common";
import cookieSession from "cookie-session";
const app = express();
//process.env.NODE_ENV !== "test"
app.set("trust proxy", true);
app.use(json());
app.use(cookieSession({ signed: false, secure: false }));

app.use(errorHandler);
export default app;
