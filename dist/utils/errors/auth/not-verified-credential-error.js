"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotVerifiedCredentialError = void 0;
const conventions_1 = require("../../../core/conventions");
class NotVerifiedCredentialError extends conventions_1.CustomError {
    constructor() {
        super('NotVerifiedCredentialError', 'error.notVerifiedCredential');
    }
}
exports.NotVerifiedCredentialError = NotVerifiedCredentialError;
//# sourceMappingURL=not-verified-credential-error.js.map