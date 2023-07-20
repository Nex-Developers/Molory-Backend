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
            const departure = new Date(route.departureDate + ' ' + route.departureTime);
            const delay = getLast48hours(departure);
            if (new Date < delay) {
            }
            saveTravel(id);
            saveTrip(route.trip.id);
            notifyUser({ id: userId, titleRef: { text: 'notification.cancelTravel.title' }, messageRef: { text: 'notification.cancelTravel.message', params: { departure: route.departureAddress, arrival: route.arrivalAddress, date: route.departureDate, time: route.departureTime } }, cover: null, data: { path: 'cancel-travel', id: id.toString(), res: 'DANGER' }, lang: 'fr', type: 'travel' });
            notifyUser({ id: route.trip.userId, titleRef: { text: 'notification.removeTrip.title' }, messageRef: { text: 'notification.removeTrip.message', params: { name: user.firstName, departure: route.departureAddress, arrival: route.arrivalAddress, date: route.departureDate, time: route.departureTime } }, cover: null, data: { path: 'cancel-travel', id: id.toString(), res: 'DANGER' }, lang: 'fr', type: 'travel' });
            const message = { text: 'response.remove' };
            return { message };
        }));
    });
}
exports.default = makeRemove;
//# sourceMappingURL=remove.js.map