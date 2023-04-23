"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const errors_1 = require("../../../utils/errors");
const helpers_1 = require("../../../utils/helpers");
function makeRemoveAccount({ removeToken } = {}) {
    if (!removeToken)
        throw new errors_1.ServerError();
    return function removeAccount({ token, id } = {}) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const prisma = helpers_1.DbConnection.prisma;
            const { email, phoneNumber, firstName, lastName } = yield prisma.user.findUnique({ where: { id } });
            yield prisma.userArchive.create({ data: { id, email, phoneNumber, firstName, lastName } });
            yield prisma.user.update({ where: { id }, data: { email: id.toString(), phoneNumber: id.toString(), firstName: 'Deleted', lastName: 'Account', deletedAt: new Date() } });
            yield removeToken({ token });
            const message = { text: 'auth.message.removeAccount' };
            return { message };
        });
    };
}
exports.default = makeRemoveAccount;
//# sourceMappingURL=remove-account.js.map