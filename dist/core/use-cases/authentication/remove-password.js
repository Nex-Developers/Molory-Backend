"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const errors_1 = require("../../../utils/errors");
function makeRemovePassword({ verifyToken, getOtp, userDb, generateToken, saveTmpToken, removeTmpToken } = {}) {
    if (!getOtp || !verifyToken || !userDb || !generateToken || !saveTmpToken || !removeTmpToken)
        throw new errors_1.ServerError();
    return function removePassword({ token, otp, } = {}) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (!token)
                throw new errors_1.MissingParamError('token');
            if (!otp)
                throw new errors_1.MissingParamError('otp');
            const { email } = yield verifyToken({ token });
            if (!email)
                throw new errors_1.InvalidParamError('token');
            const otpIndex = yield getOtp({ phoneNumber: email, otp });
            if (otpIndex === null || otpIndex === undefined)
                throw new errors_1.OtpIncorrectError('');
            yield removeTmpToken({ token });
            token = yield generateToken({ email, otp });
            yield saveTmpToken({ token });
            const message = { text: 'auth.message.removePassword' };
            return { token, message };
        });
    };
}
exports.default = makeRemovePassword;
//# sourceMappingURL=remove-password.js.map