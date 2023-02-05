"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const errors_1 = require("../../../utils/errors");
const helpers_1 = require("../../../utils/helpers");
function makeRemove({ travelDb, notifyUser, saveTrip, saveTravel } = {}) {
    if (!travelDb || !saveTravel || !saveTrip || !notifyUser)
        throw new errors_1.ServerError();
    const getLast48hours = (date) => {
        return new Date(date.getFullYear(), date.getMonth(), date.getDate() - 2);
    };
    return ({ id, cancelReason } = {}) => (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
        const prisma = helpers_1.DbConnection.prisma;
        if (!id)
            throw new errors_1.MissingParamError('id');
        if (!cancelReason)
            throw new errors_1.MissingParamError('cancelReason');
        return yield prisma.$transaction(() => (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const { userId, route, seats, payment, status, canceledAt } = yield prisma.travel.findUnique({ where: { id },
                select: {
                    userId: true,
                    status: true,
                    route: { select: {
                            id: true,
                            principal: true,
                            departureDate: true,
                            departureTime: true,
                            trip: { select: { id: true, userId: true } }
                        } },
                    seats: true,
                    payment: true,
                    canceledAt: true
                } });
            if (status === 0)
                throw new errors_1.AlreadyDoneError(canceledAt.toString());
            if (status !== 3)
                throw new errors_1.UnauthorizedError();
            yield prisma.travel.update({ where: { id }, data: { status: 0, cancelReason, canceledAt: new Date(), } });
            yield prisma.route.update({ where: { id: route.id }, data: { remainingSeats: { increment: seats } } });
            if (route.principal)
                yield prisma.trip.update({ where: { id: route.trip.id }, data: { remainingSeats: { increment: seats } } });
            const payedAmount = payment.amount;
            let amount = payedAmount;
            const departure = new Date(route.departureDate + ' ' + route.departureTime);
            const delay = getLast48hours(departure);
            if (new Date < delay) {
                amount = payedAmount * 0.15;
                yield prisma.wallet.update({ where: { id: route.trip.userId }, data: { balance: { increment: payedAmount - amount } } });
            }
            yield prisma.refund.create({ data: { id: payment.id, amount, user: { connect: { id: userId } }, travel: { connect: { id } } } });
            yield prisma.payment.update({ where: { id: payment.id }, data: { status: 0 } });
            saveTravel(id);
            saveTrip(route.trip.id);
            notifyUser({ id: route.trip.userId, titleRef: { text: 'notification.removeTravel.title' }, messageRef: { text: 'notification.removeTravel.message' }, cover: null, data: { path: 'cancel-travel', id: id.toString(), res: 'DANGER' }, lang: 'fr', type: 'travel' });
            const message = { text: 'response.remove' };
            return { message };
        }));
    });
}
exports.default = makeRemove;
//# sourceMappingURL=remove.js.map