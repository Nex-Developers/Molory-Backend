"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const errors_1 = require("../../../utils/errors");
function makeConfirmPayment({ prisma, getPaymentState } = {}) {
    return ({ id } = {}) => (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
        const { status, amount, travel } = yield prisma.payment.findFirst({
            where: { id },
            select: {
                status: true, amount: true, travel: {
                    select: { id: true, routeId: true, seats: true }
                }
            }
        });
        if (status == 2) {
            const res = yield getPaymentState({ id });
            console.log(res);
            yield prisma.payment.update({
                where: { id }, data: {
                    reference: res.api_response_id,
                    receivedAmount: +res.data.amount,
                    method: res.data.payment_method,
                    accessNumber: res.data.operator_id,
                    status: res.code == "00" ? 1 : 0,
                    validatedAt: res.data.payment_date
                }
            });
            if (res.code !== "00") {
                throw new errors_1.UnauthorizedError();
            }
            if (amount !== +res.data.amount) {
                throw new errors_1.InvalidParamError('amount');
            }
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