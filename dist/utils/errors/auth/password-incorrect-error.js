"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PasswordIncorrectError = void 0;
const __1 = require("..");
class PasswordIncorrectError extends __1.InvalidParamError {
    constructor(parameter) {
        super(parameter, 'error.passwordIncorrect');
    }
}
exports.PasswordIncorrectError = PasswordIncorrectError;
//# sourceMappingURL=password-incorrect-error.js.map