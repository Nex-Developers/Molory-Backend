"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountNotFoundError = void 0;
const conventions_1 = require("../../../core/conventions");
class AccountNotFoundError extends conventions_1.CustomError {
    constructor(parameter) {
        super('AccountNotFoundError', 'error.userNotFound', parameter);
    }
}
exports.AccountNotFoundError = AccountNotFoundError;
//# sourceMappingURL=account-not-found-error.js.map