"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const errors_1 = require("../../../utils/errors");
function makeSignUp({ userDb, askToConfirmEmail, isValidEmail, hashPassword, generateToken, saveTmpToken, generateOtp, saveOtp } = {}) {
    if (!userDb || !askToConfirmEmail || !isValidEmail || !hashPassword || !generateToken || !saveTmpToken || !generateOtp || !saveOtp)
        throw new errors_1.ServerError();
    return function signUp({ firstName, lastName, birthDay, phoneNumber, email, password, language, gender } = {}) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            console.log('signup');
            if (!firstName)
                throw new errors_1.MissingParamError('firstName');
            if (!lastName)
                throw new errors_1.MissingParamError('lastName');
            if (!birthDay)
                throw new errors_1.MissingParamError('birthDay');
            if (typeof birthDay == 'string')
                birthDay = new Date(birthDay);
            if (!email)
                throw new errors_1.MissingParamError('email');
            if (!isValidEmail({ email }))
                throw new errors_1.InvalidParamError('email');
            if (!password)
                throw new errors_1.MissingParamError('password');
            password = yield hashPassword({ password });
            try {
                yield userDb.insertOne({ data: { firstName, lastName, phoneNumber, email, password, birthDay, role: 'user', language, signUpMethod: "email", gender, profileCompletedAt: new Date(), status: 3 } });
            }
            catch (err) {
                console.log(err.message);
                throw new errors_1.AccountAllReadyExistError('email');
            }
            const token = yield generateToken({ email });
            const otp = yield generateOtp();
            yield saveTmpToken({ token });
            yield saveOtp({ phoneNumber: email, otp });
            try {
                yield askToConfirmEmail({ email, otp, firstName, lastName, lang: language });
            }
            catch (err) {
                console.log(err.message);
                throw new errors_1.InvalidParamError('email');
            }
            const message = { text: 'auth.message.register', params: { email } };
            return { token, message };
        });
    };
}
exports.default = makeSignUp;
//# sourceMappingURL=sign-up.js.map