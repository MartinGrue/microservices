import { Response, Request, NextFunction } from "express";
import { ClientError, CustomError } from "../errors/ErrorTypes";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response<ClientError>,
  next: NextFunction
) => {
  if (err instanceof CustomError) {
    console.log("got custom error type");
    return res.status(err.statusCode).send(err.formatErrorForClient());
  }

  return res.status(400).send({ errors: [{ message: err.message }] });
};
