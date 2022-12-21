"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const errors_1 = require("../../../utils/errors");
const helpers_1 = require("../../../utils/helpers");
function makeConfirmPayment({ saveProfile }) {
    if (saveProfile)
        throw new errors_1.ServerError();
    return ({ id, status, amount, method, reference, validatedAt, } = {}) => (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
        const prisma = helpers_1.DbConnection.prisma;
        console.log('Confirm-payment called with ', id, status, amount);
        if (!status) {
            const message = { text: "response.delete" };
            return { message };
        }
        const saved = yield helpers_1.CacheManager.get(id);
        if (!saved)
            throw new errors_1.ExpiredParamError('payement id');
        const data = JSON.parse(saved);
        if (data.amount != amount) {
            throw new errors_1.InvalidParamError('amount');
        }
        if (!method)
            method = null;
        if (!validatedAt)
            validatedAt = new Date();
        if (!reference)
            reference = null;
        return yield prisma.$transaction(() => (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const { remainingSeats, principal, trip } = yield prisma.route.findUnique({
                where: { id: data.routeId },
                select: { remainingSeats: true, principal: true, trip: true }
            });
            if (!trip.remainingSeats)
                throw new errors_1.InvalidParamError('Unvailable seats');
            if (data.seats > remainingSeats)
                throw new errors_1.InvalidParamError('Missing ' + (data.seats - remainingSeats) + ' seats');
            const travel = yield prisma.travel.create({
                data: {
                    seats: data.seats,
                    description: data.description,
                    payment: {
                        create: {
                            id,
                            userId: data.userId,
                            amount: data.amount,
                            reference,
                            validatedAt,
                            method,
                            status: 1
                        }
                    },
                    route: {
                        connect: { id: data.routeId }
                    },
                    user: {
                        connect: { id: data.userId }
                    }
                }
            });
            if (principal) {
                yield prisma.route.update({ where: { id: data.routeId }, data: { remainingSeats: { decrement: data.seats, } } });
                yield prisma.trip.update({ where: { id: trip.id }, data: { remainingSeats: { decrement: data.seats, } } });
            }
            else {
                yield prisma.route.update({ where: { id: data.routeId }, data: { remainingSeats: { decrement: data.seats, } } });
                const secondaryRoutes = yield prisma.route.findMany({ where: { principal: false }, select: { remainingSeats: true } });
                if (secondaryRoutes.length) {
                    const A = secondaryRoutes[0].remainingSeats;
                    const B = secondaryRoutes[1].remainingSeats;
                    if (A !== B) {
                        prisma.route.updateMany({ where: { id: data.routeId, principal: true }, data: { remainingSeats: { decrement: data.seats, } } });
                        yield prisma.trip.update({ where: { id: trip.id }, data: { remainingSeats: { decrement: data.seats, } } });
                    }
                }
            }
            yield helpers_1.CacheManager.remove(id);
            saveProfile(travel.userId);
            const message = { text: "response.add", data: travel };
            return { message };
        }));
    });
}
exports.default = makeConfirmPayment;
//# sourceMappingURL=confirm-payment.js.map