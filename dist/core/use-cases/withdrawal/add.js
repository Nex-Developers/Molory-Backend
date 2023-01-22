"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const invalid_param_error_1 = require("./../../../utils/errors/invalid-param-error");
const errors_1 = require("../../../utils/errors");
const helpers_1 = require("../../../utils/helpers");
const uuid_1 = require("uuid");
function makeAdd({ addCinetpayContacts, cinetpayTransfert } = {}) {
    if (!addCinetpayContacts || !cinetpayTransfert)
        throw new errors_1.ServerError();
    const generateUid = (prisma) => (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
        const uid = (0, uuid_1.v4)();
        const withdrawal = yield prisma.withdrawal.findFirst({ where: { id: uid } });
        if (withdrawal)
            return yield generateUid(prisma);
        return uid;
    });
    return ({ userId, prefix, phone, } = {}) => (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
        const prisma = helpers_1.DbConnection.prisma;
        if (!prefix)
            throw new errors_1.MissingParamError('prefix');
        if (!phone)
            throw new errors_1.MissingParamError('phone');
        const { firstName, lastName, email } = yield prisma.user.findUnique({ where: { id: userId }, select: { lastName: true, firstName: true, email: true } });
        const { balance } = yield prisma.wallet.findUnique({ where: { id: userId }, select: { balance: true } });
        if (!balance)
            throw new invalid_param_error_1.InvalidParamError('balance is null');
        const res = yield addCinetpayContacts({ firstName, lastName, email, prefix, phone });
        if (!res)
            throw new errors_1.ServerError();
        const id = yield generateUid(prisma);
        const transactionId = yield cinetpayTransfert({ id, amount: balance, prefix, phone, path: 'withdrawal-confirmation' });
        let status = 3;
        if (transactionId)
            status = 2;
        yield prisma.withdrawal.create({ data: { id, amount: balance, accessNumber: prefix + phone, status, transactionId, wallet: { connect: { id: userId } } } });
        yield prisma.wallet.update({ where: { id: userId }, data: { balance: 0 } });
        const message = { text: "response.add" };
        return { message, id };
    });
}
exports.default = makeAdd;
//# sourceMappingURL=add.js.map