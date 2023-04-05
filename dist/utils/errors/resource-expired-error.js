"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResourceExpiredError = void 0;
const conventions_1 = require("../../core/conventions");
class ResourceExpiredError extends conventions_1.CustomError {
    constructor(parameter, message = 'error.expired') {
        super('ResourceExpiredError', message, { parameter });
    }
}
exports.ResourceExpiredError = ResourceExpiredError;
//# sourceMappingURL=resource-expired-error.js.map