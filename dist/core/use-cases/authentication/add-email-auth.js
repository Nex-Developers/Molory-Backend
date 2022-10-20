"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const errors_1 = require("../../../utils/errors");
function makeAddEmailAuth({ userDb, generateToken, saveTmpToken, askToConfirmEmail, isValidEmail, hashPassword } = {}) {
    if (!userDb || !generateToken || !saveTmpToken || !askToConfirmEmail || !isValidEmail || !hashPassword)
        throw new errors_1.ServerError();
    return function ({ id, email, password } = {}) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            if (!id)
                throw new errors_1.InvalidParamError('token');
            if (!email)
                throw new errors_1.MissingParamError('email');
            if (!password)
                throw new errors_1.MissingParamError('password');
            if (!isValidEmail({ email }))
                throw new errors_1.InvalidParamError('email');
            const user = yield userDb.findFirst({ where: { id }, select: { email: true, password: true, firstName: true, language: true } });
            if (user && (user.email || user.password)) {
                const message = { text: 'error.alreadyDone', params: "all" };
                return { message };
            }
            password = yield hashPassword({ password });
            const token = yield generateToken({ email });
            yield saveTmpToken({ token });
            yield askToConfirmEmail({ email, token, firstName: user.firstName, lang: user.language });
            yield userDb.updateOne({ where: { id }, data: { email, password } });
            const message = { text: 'auth.message.profileUpdated' };
            return { message };
        });
    };
}
exports.default = makeAddEmailAuth;
//# sourceMappingURL=add-email-auth.js.map