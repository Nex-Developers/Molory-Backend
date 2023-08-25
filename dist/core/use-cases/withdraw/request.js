"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const errors_1 = require("../../../utils/errors");
const helpers_1 = require("../../../utils/helpers");
function makeRequest({ saveTransaction } = {}) {
    if (!saveTransaction)
        throw new errors_1.ServerError();
    return ({ phoneNumber, userId } = {}) => (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
        if (!userId)
            throw new errors_1.MissingParamError('userId');
        if (!phoneNumber)
            throw new errors_1.MissingParamError('phoneNumber');
        const prisma = helpers_1.DbConnection.prisma;
        const { firstName, lastName, email } = yield prisma.user.findUnique({ where: { id: userId } });
        const { balance } = yield prisma.wallet.findUnique({ where: { id: userId } });
        console.log(balance);
        if (balance < 100)
            throw new errors_1.InvalidParamError("balance");
        const res = yield saveTransaction({ firstName, lastName, email, phoneNumber, amount: 100, type: 'withdraw' });
        yield prisma.transaction.create({ data: { id: res.id, ref: res.transactionId, amount: balance, type: 'withdraw', wallet: { connect: { id: userId } } } });
        const message = { text: "response.add" };
        return { message, data: { id: res.id, ref: res.transactionId, amount: balance } };
    });
}
exports.default = makeRequest;
//# sourceMappingURL=request.js.map