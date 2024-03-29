import { Response, Request, NextFunction } from "express";
import { validationResult } from "express-validator";
import { RequestValidationError } from "../errors/ErrorTypes";

export const validateRequest = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new RequestValidationError(errors.array());
  }
  next();
};
