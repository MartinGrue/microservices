import { Response, Request, NextFunction } from "express";
declare type Payload = {
    email: string;
    userId: string;
};
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
export declare const currentUser: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export {};
