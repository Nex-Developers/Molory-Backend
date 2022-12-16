"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const errors_1 = require("../../../utils/errors");
function makeSignInWithEmailAndPassword({ userDb, comparePasswords, generateToken, saveToken } = {}) {
    if (!userDb || !comparePasswords || !generateToken || !saveToken)
        throw new errors_1.ServerError();
    return function signInWithEmailAndPassword({ email, password } = {}) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (!email)
                throw new errors_1.MissingParamError('email');
            if (!password)
                throw new errors_1.MissingParamError('password');
            const user = yield userDb.findFirst({ where: { email }, select: { id: true, role: true, firstName: true, lastName: true, phoneNumber: true, birthDay: true, email: true, emailVerifiedAt: true, password: true, createdAt: true } });
            if (!user)
                throw new errors_1.AccountNotFoundError('email');
            if (!user.emailVerifiedAt)
                throw new errors_1.UnauthorizedError();
            if (!(yield comparePasswords({ hash: user.password, password })))
                throw new errors_1.PasswordIncorrectError('');
            const token = yield generateToken({ id: user.id, role: user.role });
            yield saveToken({ token });
            const message = { text: 'auth.message.login' };
            delete user.password;
            return { token, data: user, message };
        });
    };
}
exports.default = makeSignInWithEmailAndPassword;
//# sourceMappingURL=sign-in-with-email-and-password.js.map