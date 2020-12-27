"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
var ErrorTypes_1 = require("../errors/ErrorTypes");
exports.errorHandler = function (err, req, res, next) {
    if (err instanceof ErrorTypes_1.CustomError) {
        console.log("got custom error type:", err.message);
        return res.status(err.statusCode).send(err.formatErrorForClient());
    }
    console.log(err);
    return res.status(400).send({ errors: [{ message: err.message }] });
};
