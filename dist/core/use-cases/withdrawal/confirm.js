"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const errors_1 = require("../../../utils/errors");
const helpers_1 = require("../../../utils/helpers");
function makeConfirm({ checkCinetpayTransfert, notifyUser } = {}) {
    if (!checkCinetpayTransfert)
        throw new errors_1.ServerError();
    return ({ transaction_id, client_transaction_id, amount, sending_status, validated_at } = {}) => (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
        console.log(transaction_id, client_transaction_id, amount, sending_status, validated_at);
        const prisma = helpers_1.DbConnection.prisma;
        const withDrawal = yield prisma.withdrawal.findUnique({ where: { id: client_transaction_id } });
        if (withDrawal.status === 2) {
            const transactionData = yield checkCinetpayTransfert({ id: transaction_id });
            console.log(transactionData);
            if (!transactionData)
                return;
            if (+transactionData.amount !== withDrawal.amount) {
                console.log('transaction amount mismatch', transactionData.amount, withDrawal.amount);
                return;
            }
            if (transactionData.transfer_valid == 'Y') {
                yield prisma.withdrawal.update({ where: { id: client_transaction_id }, data: { status: 1, method: transactionData.operator, validatedAt: transactionData.validated_at } });
                notifyUser({ id: withDrawal.walletId, titleRef: { text: 'notification.withdralConfirmed.title' }, messageRef: { text: 'notification.withdralConfirmed.message' }, cover: null, data: { type: 'withdrawal', id: client_transaction_id }, lang: 'fr' });
            }
            else {
                yield prisma.withdrawal.update({ where: { id: client_transaction_id }, data: { status: 0, validatedAt: transactionData.validated_at } });
                yield prisma.wallet.update({ where: { id: withDrawal.walletId }, data: { balance: { increment: withDrawal.amount } } });
            }
        }
        else
            console.log("Already done", withDrawal.status);
    });
}
exports.default = makeConfirm;
//# sourceMappingURL=confirm.js.map