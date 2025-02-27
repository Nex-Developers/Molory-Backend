"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const errors_1 = require("../../../utils/errors");
const helpers_1 = require("../../../utils/helpers");
function makeConfirm({ updateTransaction, saveProfile, notifyUser } = {}) {
    if (!updateTransaction || !saveProfile || !notifyUser)
        throw new errors_1.ServerError();
    return ({ body } = {}) => (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
        if (!body)
            throw new errors_1.MissingParamError('body');
        const prisma = helpers_1.DbConnection.prisma;
        const { entity, name } = body;
        console.log(name, entity.status);
        if (!entity && !entity.id)
            return { recieved: false };
        const status = entity.status === 'sent' ? 1 : 0;
        const transaction = yield prisma.transaction.findUnique({ where: { id: 'trans-' + entity.id } });
        if (transaction.status !== 2)
            throw new errors_1.AlreadyDoneError(transaction.createdAt.toString());
        if (status === 1) {
            console.log('withraw', transaction.walletId, transaction.amount);
            yield prisma.wallet.update({ where: { id: transaction.walletId }, data: { balance: { increment: -transaction.amount } } });
        }
        yield prisma.transaction.update({ where: { id: transaction.id }, data: { status, method: entity.mode, validatedAt: new Date() } });
        yield updateTransaction({ id: entity.id, status, params: { method: entity.mode } });
        yield saveProfile(transaction.walletId);
        notifyUser({ id: transaction.walletId, titleRef: { text: 'notification.withdrawWallet.title' }, messageRef: { text: 'notification.withdrawWallet.message', params: { amount: transaction.amount, method: transaction.method } }, lang: 'fr', type: 'wallet' });
        return { recieved: true };
    });
}
exports.default = makeConfirm;
//# sourceMappingURL=confirm.js.map