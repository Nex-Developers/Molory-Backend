"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const errors_1 = require("../../../utils/errors");
function makeAdd({ travelDb, routeDb, paymentDb } = {}) {
    if (!travelDb || !routeDb || !paymentDb)
        throw new errors_1.ServerError();
    return ({ userId, routeId, seats } = {}) => (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
        if (!userId)
            throw new errors_1.MissingParamError('userId');
        if (!routeId)
            throw new errors_1.MissingParamError('routeId');
        if (!seats)
            throw new errors_1.MissingParamError('seats');
        const { price, remainingSeats } = yield routeDb.findFirst({
            where: { id: routeId },
            select: { price: true, remainingSeats: true }
        });
        if (!remainingSeats)
            throw new Error('Unvailable Resource');
        if (seats > remainingSeats)
            throw new Error('Missing ' + (seats - remainingSeats) + 'resource');
        const { id, payment } = yield travelDb.insertOne({
            data: {
                userId,
                routeId,
                seats,
                payment: {
                    create: {
                        userId,
                        amount: price * seats
                    }
                }
            },
            include: {
                payment: true
            }
        });
        const message = { text: "response.add" };
        return { message, id, payment };
    });
}
exports.default = makeAdd;
//# sourceMappingURL=add.js.map