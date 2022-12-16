"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const errors_1 = require("../../../utils/errors");
function makeConfirmEmail({ removeTmpToken, verifyToken, emailConfirmationView, userDb } = {}) {
    if (!removeTmpToken || !verifyToken || !userDb || !emailConfirmationView)
        throw new errors_1.ServerError();
    return function confirmEmail({ token, lang } = {}) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (!token)
                throw new errors_1.MissingParamError('token');
            const { email } = yield verifyToken({ token });
            if (!email)
                throw new errors_1.InvalidParamError('token');
            const user = yield userDb.findFirst({ where: { email }, select: { firstName: true, emailVerifiedAt: true } });
            if (!user)
                throw new errors_1.InvalidParamError('token');
            if (user.emailVerifiedAt)
                throw new errors_1.AlreadyDoneError(user.emailVerifiedAt);
            else {
                const emailVerifiedAt = new Date();
                yield userDb.updateOne({ where: { email }, data: { emailVerifiedAt } });
                removeTmpToken({ token });
            }
            return { view: yield emailConfirmationView({ lang, firstName: user.firstName }) };
        });
    };
}
exports.default = makeConfirmEmail;
//# sourceMappingURL=confirm-email.js.map