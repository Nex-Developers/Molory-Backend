"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const errors_1 = require("../../../utils/errors");
const helpers_1 = require("../../../utils/helpers");
exports.default = ({ notifyUser }) => {
    if (!notifyUser)
        throw new errors_1.ServerError();
    return ({ id }) => (0, tslib_1.__awaiter)(void 0, void 0, void 0, function* () {
        const prisma = helpers_1.DbConnection.prisma;
        return yield prisma.$transaction(() => (0, tslib_1.__awaiter)(void 0, void 0, void 0, function* () {
            console.log(' Finish trip', +id);
            const { userId, status, startedAt, routes } = yield prisma.trip.findUnique({ where: { id }, select: { userId: true, status: true, startedAt: true, routes: { select: { id: true } } } });
            if (status === 0)
                throw new errors_1.UnauthorizedError();
            if (status === 1)
                throw new errors_1.AlreadyDoneError(startedAt.toString());
            yield prisma.trip.update({ where: { id }, data: { status: 1, finishedAt: new Date() } });
            const payments = yield prisma.payment.findMany({ where: { tripId: id, status: 1 }, select: { amount: true } });
            const total = payments.reduce((total, payment) => total + payment.amount, 0);
            yield prisma.wallet.update({ where: { id: userId }, data: { balance: { increment: total } } });
            notifyUser({ id: userId, titleRef: { text: 'notification.finishTrip.title' }, messageRef: { text: 'notification.finishTrip.message' }, cover: null, data: { type: 'trip', id }, lang: 'fr' });
            const routesIds = routes.map(r => r.id);
            const travels = yield prisma.travel.findMany({ where: { id: { in: routesIds } }, select: { id: true, userId: true } });
            travels.forEach(({ id, userId }) => notifyUser({ id: userId, titleRef: { text: 'notification.startTravel.title' }, messageRef: { text: 'notification.startTravel.message' }, cover: null, data: { type: 'travel', id }, lang: 'fr' }));
            const message = { text: "response.edit" };
            return { message };
        }));
    });
};
//# sourceMappingURL=finish.js.map