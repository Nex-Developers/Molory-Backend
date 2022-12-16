"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const errors_1 = require("../../../utils/errors");
function makeSignInWithPhoneNumber({ generateOtp, saveOtp, sendOtp, generateToken, saveTmpToken, userDb } = {}) {
    if (!generateOtp || !saveOtp || !sendOtp || !generateToken || !saveTmpToken || !userDb)
        throw new errors_1.ServerError();
    return function signInWithPhoneNumber({ phoneNumber, action } = {}) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (!phoneNumber)
                throw new errors_1.MissingParamError('phoneNumber');
            if (phoneNumber.charAt(0) == '+')
                throw new errors_1.InvalidParamError('phoneNumber');
            if (phoneNumber.length < 9)
                throw new errors_1.InvalidParamError('phoneNumber');
            if (!action)
                action = 'signin';
            const user = yield userDb.findFirst({ where: { phoneNumber }, select: { id: true, email: true, signUpMethod: true } });
            if (action == 'signin') {
                if (!user)
                    throw new errors_1.AccountNotFoundError('phoneNumber');
                if (user.signUpMethod == 'email') {
                    const truncateParam = user.email.substring(0, 6) + '...';
                    throw new errors_1.UnmatchedAuthMethodError(truncateParam);
                }
            }
            else {
                if (user)
                    throw new errors_1.AccountAllReadyExistError('phoneNumber');
            }
            const otp = yield generateOtp();
            const token = yield generateToken({ phoneNumber });
            yield saveTmpToken({ token });
            yield saveOtp({ phoneNumber, otp });
            const message = { text: 'auth.message.signinWithPhone', params: { phoneNumber } };
            return { token, message };
        });
    };
}
exports.default = makeSignInWithPhoneNumber;
//# sourceMappingURL=sign-in-with-phone-number.js.map