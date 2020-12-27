import { Response, Request, NextFunction } from "express";
import { ClientError } from "../errors/ErrorTypes";
export declare const errorHandler: (err: Error, req: Request, res: Response<ClientError>, next: NextFunction) => Response<ClientError>;
