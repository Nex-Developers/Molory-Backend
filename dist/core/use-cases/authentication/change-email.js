"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const errors_1 = require("../../../utils/errors");
const helpers_1 = require("../../../utils/helpers");
function makeChangeEmail({ userDb, generateToken, removeToken, saveTmpToken, askToConfirmEmail, isValidEmail, generateOtp } = {}) {
    if (!userDb || !generateOtp || !generateToken || !saveTmpToken || !askToConfirmEmail || !isValidEmail || !removeToken)
        throw new errors_1.ServerError();
    return function changeEmail({ id, email, lang } = {}) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            if (!id)
                throw new errors_1.MissingParamError('id');
            if (!email)
                throw new errors_1.MissingParamError('email');
            if (!isValidEmail({ email }))
                throw new errors_1.InvalidParamError('email');
            if (!lang)
                throw new errors_1.MissingParamError('lang');
            const user = yield userDb.findFirst({ where: { id }, select: { email: true, firstName: true, emailVerifiedAt: true } });
            console.log(user);
            if (!user)
                throw new errors_1.InvalidParamError('id');
            if (user.email === email)
                throw new errors_1.AlreadyDoneError('before');
            const otp = yield generateOtp();
            const token = yield generateToken({ email });
            yield saveTmpToken({ token });
            yield askToConfirmEmail({ email, otp, firstName: user.firstName, lang });
            yield helpers_1.CacheManager.set(email, JSON.stringify({ id, code: otp.toString() }));
            const message = { text: 'auth.message.changeEmail', params: { email } };
            return { message, token };
        });
    };
}
exports.default = makeChangeEmail;
//# sourceMappingURL=change-email.js.map