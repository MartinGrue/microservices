"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotAuthorizedError = exports.BadRequestError = exports.DataBaseConnectionError = exports.RequestValidationError = exports.CustomError = void 0;
class CustomError extends Error {
    constructor(msg) {
        super(msg);
        Object.setPrototypeOf(this, CustomError.prototype);
    }
}
exports.CustomError = CustomError;
class RequestValidationError extends CustomError {
    constructor(errors = [], message = "RequestValidationError") {
        super(message);
        this.errors = errors;
        this.message = message;
        this.statusCode = 400;
        Object.setPrototypeOf(this, RequestValidationError.prototype);
    }
    formatErrorForClient() {
        return {
            errors: this.errors.map((error) => {
                return { message: error.msg, field: error.param };
            }),
        };
    }
}
exports.RequestValidationError = RequestValidationError;
class DataBaseConnectionError extends CustomError {
    constructor() {
        super("DataBaseConnectionError");
        this.statusCode = 500;
        this.reason = "database error";
        Object.setPrototypeOf(this, DataBaseConnectionError.prototype);
    }
    formatErrorForClient() {
        return { errors: [{ message: this.reason }] };
    }
}
exports.DataBaseConnectionError = DataBaseConnectionError;
class BadRequestError extends CustomError {
    constructor(msg) {
        super(msg);
        this.msg = msg;
        this.statusCode = 404;
        Object.setPrototypeOf(this, BadRequestError.prototype);
    }
    formatErrorForClient() {
        return { errors: [{ message: this.msg }] };
    }
}
exports.BadRequestError = BadRequestError;
class NotAuthorizedError extends CustomError {
    constructor() {
        super("NotAuthorizedError");
        this.statusCode = 401;
        this.msg = "Not authorized";
        Object.setPrototypeOf(this, NotAuthorizedError.prototype);
    }
    formatErrorForClient() {
        return { errors: [{ message: this.msg }] };
    }
}
exports.NotAuthorizedError = NotAuthorizedError;
