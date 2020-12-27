"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRequest = void 0;
var express_validator_1 = require("express-validator");
var ErrorTypes_1 = require("../errors/ErrorTypes");
exports.validateRequest = function (req, res, next) {
    var errors = express_validator_1.validationResult(req);
    if (!errors.isEmpty()) {
        throw new ErrorTypes_1.RequestValidationError(errors.array());
    }
    next();
};
