"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidParamError = void 0;
const conventions_1 = require("../../core/conventions");
class InvalidParamError extends conventions_1.CustomError {
    constructor(parameter, message = 'error.invalid') {
        super('InvalidParamError', message, { parameter });
    }
}
exports.InvalidParamError = InvalidParamError;
//# sourceMappingURL=invalid-param-error.js.map