"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRequest = void 0;
const express_validator_1 = require("express-validator");
const ErrorTypes_1 = require("../errors/ErrorTypes");
const validateRequest = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        throw new ErrorTypes_1.RequestValidationError(errors.array());
    }
    next();
};
exports.validateRequest = validateRequest;
