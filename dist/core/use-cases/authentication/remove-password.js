"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const errors_1 = require("../../../utils/errors");
function makeRemovePassword({ removeTmpToken, verifyToken, resetPasswordView, userDb } = {}) {
    if (!removeTmpToken || !verifyToken || !userDb || !resetPasswordView)
        throw new errors_1.ServerError();
    return function removePassword({ token, lang } = {}) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            if (!token)
                throw new errors_1.MissingParamError('token');
            const { email } = yield verifyToken({ token });
            if (!email)
                throw new errors_1.InvalidParamError('token');
            const user = yield userDb.findFirst({ where: { email }, select: { firstName: true, password: true } });
            if (!user)
                throw new errors_1.InvalidParamError('link');
            if (!user.password)
                throw new errors_1.AlreadyDoneError('before');
            yield userDb.updateOne({ where: { email }, data: { password: '' } });
            removeTmpToken({ token });
            return resetPasswordView({ lang, firstName: user.firstName });
        });
    };
}
exports.default = makeRemovePassword;
//# sourceMappingURL=remove-password.js.map