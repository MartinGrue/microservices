import { Response, Request, NextFunction } from "express";
export declare const requireAuth: (req: Request, res: Response, next: NextFunction) => Promise<void>;
