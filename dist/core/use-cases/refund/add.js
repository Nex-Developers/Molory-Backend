"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const already_done_error_1 = require("./../../../utils/errors/already-done-error");
const errors_1 = require("../../../utils/errors");
const helpers_1 = require("../../../utils/helpers");
function makeAdd({ addCinetpayContacts, cinetpayTransfert } = {}) {
    if (!addCinetpayContacts || !cinetpayTransfert)
        throw new errors_1.ServerError();
    return ({ id, phone, prefix } = {}) => (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
        const prisma = helpers_1.DbConnection.prisma;
        if (!phone)
            throw new errors_1.MissingParamError('phone');
        if (!prefix)
            throw new errors_1.MissingParamError('prefix');
        const { amount, status, user } = yield prisma.refund.findUnique({ where: { id }, select: { amount: true, status: true, user: { select: { lastName: true, firstName: true, email: true } } } });
        const { firstName, lastName, email } = user;
        if (status !== 3)
            throw new already_done_error_1.AlreadyDoneError('some time');
        yield addCinetpayContacts({ firstName, lastName, email, phone, prefix });
        const transactionId = yield cinetpayTransfert({ id, amount, phone, prefix, path: 'refund-confirmation' });
        let newStatus = 3;
        if (!transactionId)
            newStatus = 2;
        yield prisma.refund.update({ where: { id }, data: { transactionId, status: newStatus } });
        const message = { text: "response.add" };
        return { message, id };
    });
}
exports.default = makeAdd;
//# sourceMappingURL=add.js.map