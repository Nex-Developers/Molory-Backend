"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const errors_1 = require("../../../utils/errors");
const uuid_1 = require("uuid");
const helpers_1 = require("../../../utils/helpers");
function makeAdd({ travelDb, routeDb, paymentDb, pay } = {}) {
    if (!travelDb || !routeDb || !paymentDb)
        throw new errors_1.ServerError();
    const generateUid = () => (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
        const uid = (0, uuid_1.v4)();
        const payment = yield paymentDb.findFirst({ where: { id: uid } });
        if (payment)
            return yield generateUid();
        if (yield helpers_1.CacheManager.get(uid))
            return yield generateUid();
        return uid;
    });
    return ({ userId, routeId, seats, description, promotionId } = {}) => (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
        const prisma = helpers_1.DbConnection.prisma;
        if (!userId)
            throw new errors_1.MissingParamError('userId');
        if (!routeId)
            throw new errors_1.MissingParamError('routeId');
        if (!seats)
            throw new errors_1.MissingParamError('seats');
        if (!description)
            description = null;
        const { price, fees, remainingSeats } = yield routeDb.findFirst({
            where: { id: routeId },
            select: { price: true, fees: true, remainingSeats: true }
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
            applyDiscount = discount;
        }
        const id = yield generateUid();
        console.log(id);
        const amount = (price + fees) * seats * applyDiscount;
        const createdAt = new Date();
        const { firstName, lastName, email, phoneNumber } = yield prisma.user.findUnique({ where: { id: userId } });
        const { url, transactionId } = yield pay({ id, amount: 100, firstName, lastName, email, phoneNumber });
        console.log(url, transactionId);
        yield helpers_1.CacheManager.set(id, JSON.stringify({ userId, routeId, seats, description, amount, createdAt, promotionId }));
        const message = { text: "response.add" };
        return { message, payment: { id, amount, createdAt, paymentUrl: url, transactionId } };
    });
}
exports.default = makeAdd;
//# sourceMappingURL=add-old.js.map