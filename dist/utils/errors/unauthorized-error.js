"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnauthorizedError = void 0;
const conventions_1 = require("../../core/conventions");
class UnauthorizedError extends conventions_1.CustomError {
    constructor() {
        super('UnauthorizedError', 'error.unauthorized');
    }
}
exports.UnauthorizedError = UnauthorizedError;
//# sourceMappingURL=unauthorized-error.js.map