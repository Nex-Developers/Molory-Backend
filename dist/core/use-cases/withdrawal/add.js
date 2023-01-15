"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
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
    return ({ userId, phoneNumber, } = {}) => (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
        const prisma = helpers_1.DbConnection.prisma;
        if (!phoneNumber)
            throw new errors_1.MissingParamError('phoneNumber');
        const { firstName, lastName, email } = yield prisma.user.findUnique({ where: { id: userId }, select: { lastName: true, firstName: true, email: true } });
        const { balance } = yield prisma.wallet.findUnique({ where: { id: userId }, select: { balance: true } });
        yield addCinetpayContacts({ firstName, lastName, email });
        const id = generateUid(prisma);
        yield prisma.withdrawal.create({ data: { id, amount: balance, accessNumber: phoneNumber, wallet: { connect: { id: userId } } } });
        yield cinetpayTransfert({ id, amount: balance, phoneNumber });
        yield prisma.withdrawal.create({ data: { id, amount: balance, accessNumber: phoneNumber, status: 2, wallet: { connect: { id: userId } } } });
        const message = { text: "response.add" };
        return { message, id };
    });
}
exports.default = makeAdd;
//# sourceMappingURL=add.js.map