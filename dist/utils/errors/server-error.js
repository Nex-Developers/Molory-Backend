"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerError = void 0;
const conventions_1 = require("../../core/conventions");
class ServerError extends conventions_1.CustomError {
    constructor() {
        super('ServerError', 'error.internal');
    }
}
exports.ServerError = ServerError;
//# sourceMappingURL=server-error.js.map