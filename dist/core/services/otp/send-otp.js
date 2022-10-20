"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
function makeSendOtp({ sendSms } = {}) {
    return function sendOtp({ phoneNumber, otp }) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const message = `Votre code pour se connecter: ${otp}`;
            return sendSms([phoneNumber], message);
        });
    };
}
exports.default = makeSendOtp;
//# sourceMappingURL=send-otp.js.map