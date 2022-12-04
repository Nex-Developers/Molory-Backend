"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const already_done_error_1 = require("./../../../utils/errors/already-done-error");
const errors_1 = require("../../../utils/errors");
const helpers_1 = require("../../../utils/helpers");
function makeConfirmPayment() {
    return ({ id, status, amount } = {}) => (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
        const prisma = helpers_1.DbConnection.prisma;
        console.log('Confirm-payment called with ', id, status, amount);
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
        let travel = payment.travel;
        if (payment.status == 2) {
            return yield prisma.$transaction(() => (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
                const { remainingSeats, principal, trip } = yield prisma.route.findFirst({
                    where: { id: travel.routeId },
                    select: { remainingSeats: true, principal: true, trip: true }
                });
                if (!trip.remainingSeats)
                    throw new errors_1.InvalidParamError('Unvailable Resource');
                if (travel.seats > remainingSeats)
                    throw new errors_1.InvalidParamError('Missing ' + (travel.seats - remainingSeats) + 'resource');
                travel = yield prisma.travel.update({ where: { id: travel.id }, data: { status: 3 } });
                if (principal) {
                    yield prisma.route.updateMany({ where: { tripId: trip.id }, data: { remainingSeats: { decrement: travel.seats, } } });
                }
                else {
                    yield prisma.route.update({ where: { id }, data: { remainingSeats: { decrement: travel.seats, } } });
                    const secondaryRoutes = yield prisma.route.findMany({ where: { principal: false }, select: { remainingSeats: true } });
                    if (secondaryRoutes.length) {
                        const A = secondaryRoutes[0].remainingSeats;
                        const B = secondaryRoutes[1].remainingSeats;
                        if (A !== B)
                            prisma.route.updateMany({ where: { principal: true }, data: { remainingSeats: { decrement: travel.seats, } } });
                    }
                }
                const message = { text: "response.add", data: travel };
                return { message };
            }));
        }
        else {
            throw new already_done_error_1.AlreadyDoneError(new Date().toISOString());
        }
    });
}
exports.default = makeConfirmPayment;
//# sourceMappingURL=confirm-payment.js.map