"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const errors_1 = require("../../../utils/errors");
function makeConfirmPayment({ prisma, } = {}) {
    return ({ id, status, amount } = {}) => (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
        if (!status) {
            const message = { text: "response.delete" };
            return { message };
        }
        const payment = yield prisma.payment.findFirst({
            where: { id },
            select: {
                status: true, amount: true, travel: {
                    select: { id: true, routeId: true, seats: true }
                }
            }
        });
        if (payment.amount != amount) {
            throw new errors_1.InvalidParamError('amount');
        }
        const travel = payment.travel;
        if (payment.status == 2) {
            prisma.$transaction((_) => (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
                const { remainingSeats, principal, trip } = yield prisma.route.findFirst({
                    where: { id: travel.routeId },
                    select: { remainingSeats: true, principal: true, trip: true }
                });
                if (!trip.remainingSeats)
                    throw new Error('Unvailable Resource');
                if (travel.seats > remainingSeats)
                    throw new Error('Missing ' + (travel.seats - remainingSeats) + 'resource');
                prisma.travel.update({ where: { id: travel.id }, data: { status: 3 } });
                if (principal) {
                    prisma.route.update({ where: { tripId: trip.id }, data: { remainingSeats: { decrement: travel.seats, } } });
                }
                else {
                    prisma.route.update({ where: { id }, data: { remainingSeats: { decrement: travel.seats, } } });
                    const secondaryRoutes = prisma.route.find({ where: { principal: false }, select: { remainingSeats: true } });
                    if (secondaryRoutes.length) {
                        const A = secondaryRoutes[0].remainingSeats;
                        const B = secondaryRoutes[1].remainingSeats;
                        if (A !== B)
                            prisma.route.update({ where: { principal: true }, data: { remainingSeats: { decrement: travel.seats, } } });
                    }
                }
            }));
        }
        const message = { text: "response.add" };
        return { message };
    });
}
exports.default = makeConfirmPayment;
//# sourceMappingURL=confirm-payment.js.map