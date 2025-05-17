"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const errors_1 = require("../../../utils/errors");
const helpers_1 = require("../../../utils/helpers");
function makeSignUp({ askToConfirmEmail, isValidEmail, hashPassword, generateToken, saveTmpToken, generateOtp, saveOtp, saveProfile } = {}) {
    if (!askToConfirmEmail || !isValidEmail || !hashPassword || !generateToken || !saveTmpToken || !generateOtp || !saveOtp || !saveProfile)
        throw new errors_1.ServerError();
    return function signUp({ firstName, lastName, birthDay, phoneNumber, email, password, language, gender } = {}) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const prisma = helpers_1.DbConnection.prisma;
            if (!firstName)
                throw new errors_1.MissingParamError('firstName');
            if (!lastName)
                throw new errors_1.MissingParamError('lastName');
            if (!birthDay)
                throw new errors_1.MissingParamError('birthDay');
            const formatedDateArray = birthDay.split('-');
            const fomatedDate = [formatedDateArray[1], formatedDateArray[0], formatedDateArray[2]].join('-');
            birthDay = new Date(fomatedDate);
            if (!email)
                throw new errors_1.MissingParamError('email');
            if (!isValidEmail({ email }))
                throw new errors_1.InvalidParamError('email');
            if (!password)
                throw new errors_1.MissingParamError('password');
            password = yield hashPassword({ password });
            return yield prisma.$transaction(() => (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
                let user;
                try {
                    user = yield prisma.user.create({ data: { firstName, lastName, phoneNumber, email, password, birthDay, role: 'user', language, signUpMethod: "email", gender, profileCompletedAt: new Date(), status: 3 } });
                    yield prisma.wallet.create({ data: { id: user.id } });
                }
                catch (err) {
                    console.log(err.message);
                    throw new errors_1.AccountAllReadyExistError('email');
                }
                const token = yield generateToken({ email });
                const otp = yield generateOtp();
                yield saveTmpToken({ token });
                yield saveOtp({ phoneNumber: email, otp });
                yield saveProfile(user.id);
                try {
                    yield askToConfirmEmail({ email, otp, firstName, lastName, lang: language });
                }
                catch (err) {
                    console.log(err.message);
                    return { error: 'error.failedToSendEmail' };
                }
                const message = { text: 'auth.message.register', params: { email } };
                return { token, message };
            }));
        });
    };
}
exports.default = makeSignUp;
//# sourceMappingURL=sign-up.js.map