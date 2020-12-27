import { Response, Request, NextFunction } from "express";
import { NotAuthorizedError } from "../errors/ErrorTypes";
export const requireAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.currentUser?.currentUser === null) {
    try {
      throw new NotAuthorizedError();
    } catch (error) {
      next(error);
    }
  }
  next();
};
