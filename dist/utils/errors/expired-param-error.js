"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpiredParamError = void 0;
const conventions_1 = require("../../core/conventions");
class ExpiredParamError extends conventions_1.CustomError {
    constructor(parameter) {
        super('ExpiredParamError', 'error.expired', { parameter });
    }
}
exports.ExpiredParamError = ExpiredParamError;
//# sourceMappingURL=expired-param-error.js.map