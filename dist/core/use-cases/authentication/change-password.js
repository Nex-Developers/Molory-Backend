"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const errors_1 = require("../../../utils/errors");
function makeChangePassword({ removeToken, comparePasswords, hashPassword, userDb } = {}) {
    if (!removeToken || !userDb || !comparePasswords || !hashPassword)
        throw new errors_1.ServerError();
    return function changePassword({ id, password, oldPassword, token } = {}) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            if (!token)
                throw new errors_1.MissingParamError('token');
            if (!id)
                throw new errors_1.InvalidParamError('token');
            if (!password)
                throw new errors_1.MissingParamError('password');
            const user = yield userDb.findFirst({ where: { id }, select: { password: true } });
            if (!user)
                throw new errors_1.InvalidParamError('id');
            if (user.password) {
                if (!(yield comparePasswords({ hash: user.password, password: oldPassword })))
                    throw new errors_1.InvalidParamError('oldPassword');
                if (yield comparePasswords({ hash: user.password, password }))
                    throw new errors_1.AlreadyDoneError('before');
            }
            password = yield hashPassword({ password });
            yield userDb.updateOne({
                where: { id },
                data: { password }
            });
            yield removeToken({ token });
            const message = { text: 'auth.message.changePassword' };
            return { message };
        });
    };
}
exports.default = makeChangePassword;
//# sourceMappingURL=change-password.js.map