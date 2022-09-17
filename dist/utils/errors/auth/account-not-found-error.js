"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountNotFoundError = void 0;
const __1 = require("..");
class AccountNotFoundError extends __1.InvalidParamError {
    constructor(parameter) {
        super(parameter, 'error.userNotFound');
    }
}
exports.AccountNotFoundError = AccountNotFoundError;
//# sourceMappingURL=account-not-found-error.js.map