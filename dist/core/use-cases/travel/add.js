"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const errors_1 = require("../../../utils/errors");
const uuid_1 = require("uuid");
const helpers_1 = require("../../../utils/helpers");
function makeAdd({ travelDb, routeDb, saveTransaction, confirmPayment, updateTransaction } = {}) {
    if (!travelDb || !routeDb || !saveTransaction || !confirmPayment)
        throw new errors_1.ServerError();
    const generateUid = () => (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
        const uid = (0, uuid_1.v4)();
        const payment = yield helpers_1.DbConnection.prisma.transaction.findUnique({ where: { id: uid } });
        if (payment)
            return yield generateUid();
        if (yield helpers_1.CacheManager.get(uid))
            return yield generateUid();
        return uid;
    });
    return ({ userId, routeId, seats, description, promotionId, method } = {}) => (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
        const prisma = helpers_1.DbConnection.prisma;
        if (!userId)
            throw new errors_1.MissingParamError('userId');
        if (!routeId)
            throw new errors_1.MissingParamError('routeId');
        if (!seats)
            throw new errors_1.MissingParamError('seats');
        if (!description)
            description = null;
        if (!method)
            method === 'wallet';
        const { price, fees, commission, remainingSeats } = yield routeDb.findFirst({
            where: { id: routeId },
            select: { price: true, fees: true, commission: true, remainingSeats: true }
        });
        if (!remainingSeats)
            throw new Error('Unvailable Resource');
        if (seats > remainingSeats)
            throw new Error('Remaining ' + remainingSeats + ' seats');
        let applyDiscount = 1;
        if (promotionId) {
            const { discount, isForDriver } = yield prisma.promotion.findUnique({ where: { id: promotionId } });
            if (isForDriver)
                throw new errors_1.InvalidParamError(promotionId);
            applyDiscount = 1 - discount;
        }
        const id = yield generateUid();
        console.log(id);
        const amount = Math.ceil(((price + fees + commission) * seats * applyDiscount) / 5) * 5;
        const createdAt = new Date();
        const { firstName, lastName, email, phoneNumber } = yield prisma.user.findUnique({ where: { id: userId } });
        const res = yield saveTransaction({ id, amount, firstName, lastName, email, phoneNumber, type: 'payment', method, params: { userId, bookingStatus: 2 } });
        yield helpers_1.CacheManager.set(res.id, JSON.stringify({ userId, routeId, seats, description, amount, createdAt, promotionId }));
        if (method === 'wallet') {
            updateTransaction({ id, status: 1 });
            yield confirmPayment({ id, status: 1, amount, method, reference: res.transactionId, validatedAt: new Date() });
        }
        const message = { text: "response.add" };
        return { message, payment: Object.assign({ id, amount, createdAt }, res) };
    });
}
exports.default = makeAdd;
//# sourceMappingURL=add.js.map