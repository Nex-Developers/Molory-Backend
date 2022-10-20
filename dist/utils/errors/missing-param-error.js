"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MissingParamError = void 0;
const conventions_1 = require("../../core/conventions");
class MissingParamError extends conventions_1.CustomError {
    constructor(parameter) {
        super('MissingParamError', 'error.missing', { parameter });
    }
}
exports.MissingParamError = MissingParamError;
//# sourceMappingURL=missing-param-error.js.map