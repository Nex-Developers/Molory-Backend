"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const errors_1 = require("../../../utils/errors");
const helpers_1 = require("../../../utils/helpers");
function makeConfirm({ checkCinetpayTansfert, notifyUser } = {}) {
    if (!checkCinetpayTansfert || !notifyUser)
        throw new errors_1.ServerError();
    return ({ transaction_id, client_transaction_id, amount, sending_status, validated_at } = {}) => (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
        console.log(transaction_id, client_transaction_id, amount, sending_status, validated_at);
        const prisma = helpers_1.DbConnection.prisma;
        const refund = yield prisma.refund.findUnique({ where: { id: client_transaction_id } });
        if (refund.status === 2) {
            const transactionData = yield checkCinetpayTansfert({ id: transaction_id });
            console.log(transactionData);
            if (!transactionData)
                return;
            if (transactionData.amount !== refund.amount) {
                console.log('transaction amount mismatch', transactionData.amount, refund.amount);
                return;
            }
            if (transactionData.status == '00') {
                yield prisma.refund.update({ where: { id: client_transaction_id }, data: { status: 1, validatedAt: new Date(validated_at) } });
                notifyUser({ id: refund.userId, titleRef: { text: 'notification.withdralConfirmed.title' }, messageRef: { text: 'notification.withdralConfirmed.message' }, cover: null, data: { type: 'withdrawal', id: client_transaction_id }, lang: 'fr' });
            }
        }
    });
}
exports.default = makeConfirm;
//# sourceMappingURL=confirm.js.map