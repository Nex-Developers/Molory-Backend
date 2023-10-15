"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const errors_1 = require("../../../utils/errors");
const helpers_1 = require("../../../utils/helpers");
const uuid_1 = require("uuid");
const makeWithdraw = ({ setTransaction, saveProfile, notifyUser, }) => {
    if (!setTransaction || !saveProfile || !notifyUser)
        throw new errors_1.ServerError();
    const generateUid = () => (0, tslib_1.__awaiter)(void 0, void 0, void 0, function* () {
        const uid = (0, uuid_1.v4)();
        return uid;
    });
    return ({ userId, amount }) => (0, tslib_1.__awaiter)(void 0, void 0, void 0, function* () {
        if (!userId)
            throw new errors_1.MissingParamError('userId');
        if (!amount)
            throw new errors_1.MissingParamError('amount');
        const prisma = helpers_1.DbConnection.prisma;
        const { firstName, lastName, email, phoneNumber } = yield prisma.user.findUnique({ where: { id: userId } });
        console.log(firstName, lastName, email, phoneNumber);
        const id = yield generateUid();
        const trans = yield prisma.transaction.create({ data: { id, amount, type: 'withdraw', ref: 'trans-' + id, wallet: { connect: { id: userId } } } });
        yield prisma.wallet.update({ where: { id: userId }, data: { balance: { decrement: amount } } });
        yield prisma.transaction.update({ where: { id: trans.id }, data: { status: 1 } });
        yield setTransaction({ id: trans.id, data: { id, amount, firstName, lastName, email, phoneNumber, type: 'recharge', userId } });
        notifyUser({ id: userId, titleRef: { text: 'notification.withdrawWallet.title' }, messageRef: { text: 'notification.withdrawWallet.message', params: { amount: amount, method: 'Molory' } }, lang: 'fr', type: 'wallet' });
        const message = { text: "response.add", id };
        return { message, id };
    });
};
exports.default = makeWithdraw;
//# sourceMappingURL=widraw.js.map