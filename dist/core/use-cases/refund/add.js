"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const already_done_error_1 = require("./../../../utils/errors/already-done-error");
const errors_1 = require("../../../utils/errors");
const helpers_1 = require("../../../utils/helpers");
function makeAdd({ addCinetpayContacts, cinetpayTransfert } = {}) {
    if (!addCinetpayContacts || !cinetpayTransfert)
        throw new errors_1.ServerError();
    return ({ id, phoneNumber, } = {}) => (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
        const prisma = helpers_1.DbConnection.prisma;
        if (!phoneNumber)
            throw new errors_1.MissingParamError('phoneNumber');
        const { firstName, lastName, email } = yield prisma.user.findUnique({ where: { id }, select: { lastName: true, firstName: true, email: true } });
        const { amount, status } = yield prisma.refund.findUnique({ where: { id }, select: { amount: true, status: true } });
        if (status !== 3)
            throw new already_done_error_1.AlreadyDoneError('some time');
        yield addCinetpayContacts({ firstName, lastName, email });
        yield cinetpayTransfert({ id, amount, phoneNumber });
        yield prisma.refund.update({ where: { id }, data: { status: 2 } });
        const message = { text: "response.add" };
        return { message, id };
    });
}
exports.default = makeAdd;
//# sourceMappingURL=add.js.map