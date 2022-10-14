"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const errors_1 = require("../../../utils/errors");
function makeCheckEmail({ userDb, generateToken, saveTmpToken } = {}) {
    if (!userDb || !generateToken || !saveTmpToken)
        throw new errors_1.ServerError();
    return function ({ email } = {}) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            if (!email)
                throw new errors_1.MissingParamError('email');
            const user = yield userDb.findFirst({ where: { email }, select: { id: true, emailVerifiedAt: true, phoneNumber: true, signUpMethod: true } });
            console.log(user);
            if (!user)
                throw new errors_1.AccountNotFoundError('email');
            if (user.signUpMethod == 'phoneNumber') {
                const truncateParam = '+' + user.phoneNumber.substring(0, 6) + '...';
                throw new errors_1.UnmatchedAuthMethodError(truncateParam);
            }
            if (!user.emailVerifiedAt)
                throw new errors_1.NotVerifiedCredentialError();
            const token = yield generateToken({ id: user.id });
            yield saveTmpToken({ token });
            const message = { text: 'auth.message.checkEmail' };
            return { token, message };
        });
    };
}
exports.default = makeCheckEmail;
//# sourceMappingURL=check-email.js.map