"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountAllReadyExistError = void 0;
const __1 = require("..");
class AccountAllReadyExistError extends __1.InvalidParamError {
    constructor(parameter) {
        super(parameter, 'error.userAlreadyExists');
    }
}
exports.AccountAllReadyExistError = AccountAllReadyExistError;
//# sourceMappingURL=account-all-ready-exist-error.js.map