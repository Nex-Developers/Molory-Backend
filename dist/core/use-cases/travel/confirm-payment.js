"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const helpers_1 = require("../../../utils/helpers");
function makeConfirmPayment({ getPaymentState } = {}) {
    return ({ id } = {}) => (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
        const prisma = helpers_1.DbConnection.prisma;
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
                return;
            }
            if (amount !== +res.data.amount) {
                return;
            }
            prisma.$transaction((_) => (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
                const { trip } = yield prisma.route.findFirst({
                    where: { id: travel.routeId },
                    select: { trip: true }
                });
                if (!trip.remainingSeats)
                    throw new Error('Unvailable Resource');
                if (travel.seats > trip.remainingSeats)
                    throw new Error('Missing ' + (travel.seats - trip.remainingSeats) + 'resource');
                prisma.travel.update({ where: { id: travel.id }, data: { status: 3 } });
                prisma.trip.update({ where: { id: trip.id }, data: { remainingSeats: { decrement: travel.seats } } });
            }));
        }
        return;
    });
}
exports.default = makeConfirmPayment;
//# sourceMappingURL=confirm-payment.js.map