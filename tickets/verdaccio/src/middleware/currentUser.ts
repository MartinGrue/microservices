import { Response, Request, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface ICurrentUser {
  currentUser: { email: string; id: string } | null;
}
declare global {
  namespace Express {
    interface Request {
      currentUser?: ICurrentUser;
    }
  }
}
type Payload = { email: string; id: string };
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
