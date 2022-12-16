"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const errors_1 = require("../../../utils/errors");
function makeCheckEmail({ userDb, generateToken, saveTmpToken, generateOtp, saveOtp, askToConfirmEmail, } = {}) {
    if (!userDb || !generateToken || !saveTmpToken || !generateOtp || !saveOtp || !askToConfirmEmail)
        throw new errors_1.ServerError();
    return function ({ email } = {}) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (!email)
                throw new errors_1.MissingParamError('email');
            const user = yield userDb.findFirst({ where: { email }, select: { id: true, emailVerifiedAt: true, firstName: true, lastName: true, phoneNumber: true, signUpMethod: true } });
            if (!user)
                throw new errors_1.AccountNotFoundError('email');
            if (user.signUpMethod == 'phoneNumber') {
                const truncateParam = '+' + user.phoneNumber.substring(0, 6) + '...';
                throw new errors_1.UnmatchedAuthMethodError(truncateParam);
            }
            if (!user.emailVerifiedAt) {
                const token = yield generateToken({ email });
                const otp = yield generateOtp();
                yield saveTmpToken({ token });
                yield saveOtp({ phoneNumber: email, otp });
                yield askToConfirmEmail({ email, otp, firstName: user.firstName, lastName: user.lastName, lang: 'fr' });
                const error = { text: 'error.notVerifiedCredential', params: { parameter: 'email' } };
                return { token, error };
            }
            const token = yield generateToken({ id: user.id });
            yield saveTmpToken({ token });
            const message = { text: 'auth.message.checkEmail' };
            return { token, message };
        });
    };
}
exports.default = makeCheckEmail;
//# sourceMappingURL=check-email.js.map