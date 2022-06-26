"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotAuthorizedError = exports.BadRequestError = exports.DataBaseConnectionError = exports.RequestValidationError = exports.CustomError = void 0;
var CustomError = /** @class */ (function (_super) {
    __extends(CustomError, _super);
    function CustomError(msg) {
        var _this = _super.call(this, msg) || this;
        Object.setPrototypeOf(_this, CustomError.prototype);
        return _this;
    }
    return CustomError;
}(Error));
exports.CustomError = CustomError;
var RequestValidationError = /** @class */ (function (_super) {
    __extends(RequestValidationError, _super);
    function RequestValidationError(errors, message) {
        if (errors === void 0) { errors = []; }
        if (message === void 0) { message = "RequestValidationError"; }
        var _this = _super.call(this, message) || this;
        _this.errors = errors;
        _this.message = message;
        _this.statusCode = 400;
        Object.setPrototypeOf(_this, RequestValidationError.prototype);
        return _this;
    }
    RequestValidationError.prototype.formatErrorForClient = function () {
        return {
            errors: this.errors.map(function (error) {
                return { message: error.msg, field: error.param };
            }),
        };
    };
    return RequestValidationError;
}(CustomError));
exports.RequestValidationError = RequestValidationError;
var DataBaseConnectionError = /** @class */ (function (_super) {
    __extends(DataBaseConnectionError, _super);
    function DataBaseConnectionError() {
        var _this = _super.call(this, "DataBaseConnectionError") || this;
        _this.statusCode = 500;
        _this.reason = "database error";
        Object.setPrototypeOf(_this, DataBaseConnectionError.prototype);
        return _this;
    }
    DataBaseConnectionError.prototype.formatErrorForClient = function () {
        return { errors: [{ message: this.reason }] };
    };
    return DataBaseConnectionError;
}(CustomError));
exports.DataBaseConnectionError = DataBaseConnectionError;
var BadRequestError = /** @class */ (function (_super) {
    __extends(BadRequestError, _super);
    function BadRequestError(msg) {
        var _this = _super.call(this, msg) || this;
        _this.msg = msg;
        _this.statusCode = 404;
        Object.setPrototypeOf(_this, BadRequestError.prototype);
        return _this;
    }
    BadRequestError.prototype.formatErrorForClient = function () {
        return { errors: [{ message: this.msg }] };
    };
    return BadRequestError;
}(CustomError));
exports.BadRequestError = BadRequestError;
var NotAuthorizedError = /** @class */ (function (_super) {
    __extends(NotAuthorizedError, _super);
    function NotAuthorizedError() {
        var _this = _super.call(this, "NotAuthorizedError") || this;
        _this.statusCode = 401;
        _this.msg = "Not authorized";
        Object.setPrototypeOf(_this, NotAuthorizedError.prototype);
        return _this;
    }
    NotAuthorizedError.prototype.formatErrorForClient = function () {
        return { errors: [{ message: this.msg }] };
    };
    return NotAuthorizedError;
}(CustomError));
exports.NotAuthorizedError = NotAuthorizedError;
