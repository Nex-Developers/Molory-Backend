"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const errors_1 = require("../../../utils/errors");
function makeRecoverPassword({ userDb, generateToken, saveTmpToken, askToResetPassword, generateOtp, saveOtp } = {}) {
    if (!userDb || !generateToken || !saveTmpToken || !askToResetPassword || !generateOtp || !saveOtp)
        throw new errors_1.ServerError();
    return function recoverPassword({ email, lang } = {}) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (!email)
                throw new errors_1.MissingParamError('email');
            if (!lang)
                throw new errors_1.MissingParamError('lang');
            const user = yield userDb.findFirst({ where: { email }, select: { firstName: true, emailVerifiedAt: true } });
            if (!user)
                throw new errors_1.InvalidParamError('email');
            if (!user.emailVerifiedAt)
                throw new Error('Your email is not confirmed. Check your box');
            const token = yield generateToken({ email });
            const otp = yield generateOtp();
            yield saveTmpToken({ token });
            yield saveOtp({ phoneNumber: email, otp });
            try {
                yield askToResetPassword({ email, otp, firstName: user.firstName, lastName: user.lastName, lang: 'fr' });
            }
            catch (err) {
                console.log(err.message);
                throw new errors_1.InvalidParamError('email');
            }
            const message = { text: 'auth.message.recoverPassword', params: { email } };
            return { token, message };
        });
    };
}
exports.default = makeRecoverPassword;
//# sourceMappingURL=recover-password.js.map