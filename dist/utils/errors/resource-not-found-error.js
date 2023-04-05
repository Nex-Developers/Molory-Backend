"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResourceNotFoundError = void 0;
const conventions_1 = require("../../core/conventions");
class ResourceNotFoundError extends conventions_1.CustomError {
    constructor(parameter, message = 'error.notFound') {
        super('ResourceNotFoundError', message, { parameter });
    }
}
exports.ResourceNotFoundError = ResourceNotFoundError;
//# sourceMappingURL=resource-not-found-error.js.map