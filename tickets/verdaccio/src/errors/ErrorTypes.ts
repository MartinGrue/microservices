import { ValidationError } from "express-validator";
export interface ClientError {
  errors: { message: string; field?: string }[];
}
export abstract class CustomError extends Error {
  abstract statusCode: number;
  abstract formatErrorForClient(): ClientError;
  constructor(msg: string) {
    super(msg);
    Object.setPrototypeOf(this, CustomError.prototype);
  }
}


export class RequestValidationError extends CustomError {
  statusCode = 400;
  constructor(
    public errors: ValidationError[] = [],
    public message: string = "RequestValidationError"
  ) {
    super(message);
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }
  formatErrorForClient(): ClientError {
    return {
      errors: this.errors.map((error) => {
        return { message: error.msg, field: error.param };
      }),
    };
  }
}

export class DataBaseConnectionError extends CustomError {
  statusCode = 500;
  reason = "database error";
  constructor() {
    super("DataBaseConnectionError");
    Object.setPrototypeOf(this, DataBaseConnectionError.prototype);
  }
  formatErrorForClient(): ClientError {
    return { errors: [{ message: this.reason }] };
  }
}

export class BadRequestError extends CustomError {
  statusCode = 404;
  constructor(public msg: string) {
    super(msg);
    Object.setPrototypeOf(this, BadRequestError.prototype);
  }
  formatErrorForClient(): ClientError {
    return { errors: [{ message: this.msg }] };
  }
}

export class NotAuthorizedError extends CustomError {
  statusCode = 401;
  msg = "Not authorized";
  constructor() {
    super("NotAuthorizedError");
    Object.setPrototypeOf(this, NotAuthorizedError.prototype);
  }
  formatErrorForClient(): ClientError {
    return { errors: [{ message: this.msg }] };
  }
}
