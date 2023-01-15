"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const errors_1 = require("../../../utils/errors");
const helpers_1 = require("../../../utils/helpers");
function makeConfirm({ checkCinetpayTansfert } = {}) {
    if (!checkCinetpayTansfert)
        throw new errors_1.ServerError();
    return ({ id } = {}) => (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
        if (!id)
            throw new errors_1.MissingParamError('id');
        const prisma = helpers_1.DbConnection.prisma;
        const withDrawal = yield prisma.withdrawal.findUnique({ where: { id } });
        if (withDrawal.status === 2) {
            const transactionData = yield checkCinetpayTansfert({ id });
            if (!transactionData)
                return;
            if (transactionData.amount !== withDrawal.amount) {
                console.log('transaction amount mismatch', transactionData.amount, withDrawal.amount);
                return;
            }
            if (transactionData.status == '00') {
                yield prisma.wallet.update({ where: { id: withDrawal.walletId }, data: { balance: { decrement: withDrawal.amount } } });
                yield prisma.withdrawal.update({ where: { id }, data: { status: 1 } });
            }
        }
    });
}
exports.default = makeConfirm;
//# sourceMappingURL=confirm.js.map