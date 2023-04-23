"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const errors_1 = require("../../../utils/errors");
const helpers_1 = require("../../../utils/helpers");
exports.default = ({ notifyUser, saveTrip, saveTravel }) => {
    if (!notifyUser || !saveTrip || !saveTravel)
        throw new errors_1.ServerError();
    return ({ id }) => (0, tslib_1.__awaiter)(void 0, void 0, void 0, function* () {
        const prisma = helpers_1.DbConnection.prisma;
        return yield prisma.$transaction(() => (0, tslib_1.__awaiter)(void 0, void 0, void 0, function* () {
            console.log(' Finish trip', +id);
            const { userId, status, startedAt, departureAddress, arrivalAddress, departureDate, departureTime, routes, promotionId } = yield prisma.trip.findUnique({ where: { id }, select: { userId: true, status: true, startedAt: true, departureAddress: true, arrivalAddress: true, departureDate: true, departureTime: true, promotionId: true, routes: { select: { id: true, fees: true, price: true, travels: { select: { id: true, userId: true, seats: true, status: true } } } } } });
            if (status === 0)
                throw new errors_1.UnauthorizedError();
            if (status === 1)
                throw new errors_1.AlreadyDoneError(startedAt.toString());
            yield prisma.trip.update({ where: { id }, data: { status: 1, finishedAt: new Date() } });
            let incomes = 0, commission = 0;
            const promises = routes.map((route) => (0, tslib_1.__awaiter)(void 0, void 0, void 0, function* () {
                const promises2 = route.travels.map(travel => {
                    if (travel.status == 2 || travel.status == 1) {
                        incomes += route.price * travel.seats;
                        commission += route.fees * travel.seats;
                    }
                });
                return yield Promise.all(promises2);
            }));
            yield Promise.all(promises);
            if (promotionId) {
                const { discount } = yield prisma.promotion.findUnique({ where: { id: promotionId } });
                commission -= commission * discount;
                incomes += incomes * discount;
            }
            if (incomes) {
                yield prisma.transfer.create({ data: { tripId: id, userId, amount: incomes, commission } });
                yield prisma.wallet.update({ where: { id: userId }, data: { balance: { increment: incomes } } });
            }
            console.log(`------> Trip ${id} finished with incomes for the driver of ${incomes} and a commission for the company of ${commission}.`);
            notifyUser({ id: userId, titleRef: { text: 'notification.finishTrip.title' }, messageRef: { text: 'notification.finishTrip.message', params: { departure: departureAddress, arrival: arrivalAddress, date: departureDate, time: departureTime } }, cover: null, data: { path: 'end-trip', id: id.toString(), res: 'INFOS' }, lang: 'fr', type: 'trip' });
            routes.forEach(route => route.travels.forEach(({ id, status }) => {
                if (status == 2) {
                    saveTravel(id);
                }
            }));
            saveTrip(id);
            const message = { text: "response.edit" };
            return { message };
        }));
    });
};
//# sourceMappingURL=finish.js.map