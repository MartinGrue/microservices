import express from "express";
import { json } from "body-parser";
import { BadRequestError } from "@scope/common";
import { errorHandler } from "@scope/common";
import cookieSession from "cookie-session";
import { createTicketRouter } from "./routes/new";
import { currentUser } from "@scope/common";
import { showTicketRouter } from "./routes/show";
import { indexTicketRouter } from "./routes/index";
import { updateTicketRouter } from "./routes/update";
const app = express();
//process.env.NODE_ENV !== "test"
app.set("trust proxy", true);
app.use(json());
app.use(cookieSession({ signed: false, secure: false }));

app.use(createTicketRouter);
app.use(showTicketRouter);
app.use(indexTicketRouter);
app.use(updateTicketRouter);
app.use(errorHandler);

export default app;
