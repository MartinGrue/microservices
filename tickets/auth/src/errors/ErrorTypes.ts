import { ValidationError } from "express-validator";
export abstract class CustomError extends Error {
  abstract statusCode: number;
  abstract formatErrorForClient(): ClientError;
  constructor(msg: string) {
    super();
    Object.setPrototypeOf(this, CustomError.prototype);
  }
}

export class RequestValidationError extends CustomError {
  statusCode = 400;
  constructor(public errors: ValidationError[]) {
    super("RequestValidationError");
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
export interface ClientError {
  errors: { message: string; field?: string }[];
}
