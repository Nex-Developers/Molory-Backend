"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const errors_1 = require("../../../utils/errors");
function makeChangeEmail({ userDb, generateToken, removeToken, saveTmpToken, askToConfirmEmail, isValidEmail } = {}) {
    if (!userDb || !generateToken || !saveTmpToken || !askToConfirmEmail || !isValidEmail || !removeToken)
        throw new errors_1.ServerError();
    return function changeEmail({ id, email, token, lang } = {}) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            if (!id)
                throw new errors_1.MissingParamError('id');
            if (!email)
                throw new errors_1.MissingParamError('email');
            if (!isValidEmail({ email }))
                throw new errors_1.InvalidParamError('email');
            if (!lang)
                throw new errors_1.MissingParamError('lang');
            if (!token)
                throw new errors_1.MissingParamError('token');
            const user = yield userDb.findFirst({ where: { id }, select: { email: true, firstName: true, emailVerifiedAt: true } });
            console.log(user);
            if (!user)
                throw new errors_1.InvalidParamError('id');
            if (user.email === email)
                throw new errors_1.AlreadyDoneError('before');
            yield userDb.updateOne({ where: { id }, data: { email, emailVerifiedAt: null } });
            const tmpToken = yield generateToken({ email });
            yield saveTmpToken({ token: tmpToken });
            yield askToConfirmEmail({ email, token: tmpToken, firstName: user.firstName, lang });
            yield removeToken({ token });
            const message = { text: 'auth.message.changeEmail', params: { email } };
            return { message };
        });
    };
}
exports.default = makeChangeEmail;
//# sourceMappingURL=change-email.js.map