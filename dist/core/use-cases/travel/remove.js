"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const errors_1 = require("../../../utils/errors");
const helpers_1 = require("../../../utils/helpers");
const uuid_1 = require("uuid");
function makeRemove({ travelDb, notifyUser, saveTrip, saveTravel, saveProfile } = {}) {
    if (!travelDb || !saveTravel || !saveTrip || !notifyUser || !saveProfile)
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
            const { userId, user, route, seats, status, canceledAt } = yield prisma.travel.findUnique({ where: { id },
                select: {
                    userId: true,
                    status: true,
                    user: { select: {
                            lastName: true,
                            firstName: true
                        }
                    },
                    route: { select: {
                            id: true,
                            principal: true,
                            departureDate: true,
                            departureTime: true,
                            departureAddress: true,
                            arrivalAddress: true,
                            price: true,
                            fees: true,
                            commission: true,
                            trip: { select: { id: true, userId: true } }
                        } },
                    seats: true,
                    transactions: true,
                    canceledAt: true
                } });
            if (status === 0)
                throw new errors_1.AlreadyDoneError(canceledAt.toString());
            if (status < 4)
                throw new errors_1.UnauthorizedError();
            yield prisma.travel.update({ where: { id }, data: { status: 0, cancelReason, canceledAt: new Date(), } });
            yield prisma.route.update({ where: { id: route.id }, data: { remainingSeats: { increment: seats } } });
            if (route.principal)
                yield prisma.trip.update({ where: { id: route.trip.id }, data: { remainingSeats: { increment: seats } } });
            const payment = yield prisma.transaction.findFirst({ where: { travelId: id, status: 1 } });
            const payedAmount = payment.amount;
            let amount = payedAmount;
            const departure = new Date(route.departureDate + ' ' + route.departureTime);
            const delay = getLast48hours(departure);
            console.log(new Date(), delay);
            if (new Date() < delay) {
                amount = route.price + route.commission;
                console.log('Sanction');
            }
            const transactionId = (0, uuid_1.v4)();
            yield prisma.transaction.create({ data: { id: transactionId, amount, type: 'refund', ref: transactionId, walletId: userId, status: 1 } });
            yield prisma.transaction.update({ where: { id: payment.id }, data: { status: 0 } });
            yield prisma.wallet.update({ where: { id: userId }, data: { balance: { increment: amount } } });
            saveTravel(id);
            saveTrip(route.trip.id);
            saveProfile(userId);
            notifyUser({ id: userId, titleRef: { text: 'notification.cancelTravel.title' }, messageRef: { text: 'notification.cancelTravel.message', params: { departure: route.departureAddress, arrival: route.arrivalAddress, date: route.departureDate, time: route.departureTime } }, cover: null, data: { path: 'cancel-travel', id: id.toString(), res: 'DANGER' }, lang: 'fr', type: 'travel' });
            notifyUser({ id: route.trip.userId, titleRef: { text: 'notification.removeTrip.title' }, messageRef: { text: 'notification.removeTrip.message', params: { name: user.firstName, departure: route.departureAddress, arrival: route.arrivalAddress, date: route.departureDate, time: route.departureTime } }, cover: null, data: { path: 'cancel-travel', id: id.toString(), res: 'DANGER' }, lang: 'fr', type: 'travel' });
            const message = { text: 'response.remove' };
            return { message };
        }));
    });
}
exports.default = makeRemove;
//# sourceMappingURL=remove.js.map