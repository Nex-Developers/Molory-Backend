"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OtpIncorrectError = void 0;
const __1 = require("..");
class OtpIncorrectError extends __1.InvalidParamError {
    constructor(parameter) {
        super(parameter, 'error.otpIncorrect');
    }
}
exports.OtpIncorrectError = OtpIncorrectError;
//# sourceMappingURL=otp-incorrect-error.js.map