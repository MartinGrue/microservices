import { Response, Request, NextFunction } from "express";
import jwt from "jsonwebtoken";

type Payload = { email: string; userId: string };

export interface ICurrentUser {
  currentUser: Payload | null;
}
declare global {
  namespace Express {
    interface Request {
      currentUser?: ICurrentUser;
    }
  }
}
export const currentUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.session?.jwt) {
    req.currentUser = { currentUser: null };

    return next();
  }
  try {
    const payload = jwt.verify(
      req.session.jwt,
      process.env.JWT_KEY!
    ) as Payload;
    req.currentUser = { currentUser: payload };
    return next();
  } catch (error) {
    return next(error);
  }
};
