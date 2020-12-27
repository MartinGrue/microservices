import { ValidationError } from "express-validator";
export interface ClientError {
    errors: {
        message: string;
        field?: string;
    }[];
}
export declare abstract class CustomError extends Error {
    abstract statusCode: number;
    abstract formatErrorForClient(): ClientError;
    constructor(msg: string);
}
export declare class RequestValidationError extends CustomError {
    errors: ValidationError[];
    message: string;
    statusCode: number;
    constructor(errors?: ValidationError[], message?: string);
    formatErrorForClient(): ClientError;
}
export declare class DataBaseConnectionError extends CustomError {
    statusCode: number;
    reason: string;
    constructor();
    formatErrorForClient(): ClientError;
}
export declare class BadRequestError extends CustomError {
    msg: string;
    statusCode: number;
    constructor(msg: string);
    formatErrorForClient(): ClientError;
}
export declare class NotAuthorizedError extends CustomError {
    statusCode: number;
    msg: string;
    constructor();
    formatErrorForClient(): ClientError;
}
