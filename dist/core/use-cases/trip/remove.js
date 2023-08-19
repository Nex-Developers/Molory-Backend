"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const unauthorized_error_1 = require("./../../../utils/errors/unauthorized-error");
const errors_1 = require("../../../utils/errors");
const helpers_1 = require("../../../utils/helpers");
const uuid_1 = require("uuid");
function makeRemove({ tripDb, notifyUser, saveTrip, saveTravel } = {}) {
    if (!tripDb || !notifyUser || !saveTrip || !saveTravel)
        throw new errors_1.ServerError();
    const getLast48hours = (date) => {
        const maintenant = new Date();
        const limite = new Date();
        limite.setHours(maintenant.getHours() - 48);
        return date > limite;
    };
    return ({ id, cancelReason } = {}) => (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
        const prisma = helpers_1.DbConnection.prisma;
        if (!id)
            throw new errors_1.MissingParamError('id');
        if (!cancelReason)
            throw new errors_1.MissingParamError('cancelReason');
        return yield prisma.$transaction(() => (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const { userId, status, departureDate, departureTime, routes, canceledAt } = yield prisma.trip.findFirst({
                where: { id },
                select: {
                    userId: true,
                    departureDate: true,
                    departureTime: true,
                    status: true,
                    routes: {
                        select: {
                            id: true,
                            principal: true,
                            price: true,
                            fees: true,
                            commission: true,
                            travels: {
                                select: {
                                    id: true,
                                    userId: true,
                                    transactions: {
                                        select: {
                                            id: true,
                                            amount: true,
                                            status: true
                                        }
                                    }
                                }
                            }
                        }
                    },
                    canceledAt: true
                }
            });
            if (!status)
                throw new errors_1.AlreadyDoneError(canceledAt.toString());
            if (status === 1)
                throw new unauthorized_error_1.UnauthorizedError();
            if (status === 3) {
                yield prisma.trip.update({ where: { id }, data: { status: 0, canceledAt: new Date(), cancelReason } });
                const departureDateTime = new Date(departureDate + ' ' + departureTime);
                const delay = getLast48hours(new Date(departureDateTime));
                const principal = routes.find(route => route.principal);
                console.log(departureDateTime, delay, new Date());
                const promises = routes.map((route) => (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
                    const travelsIds = route.travels.map(travel => travel.id);
                    yield prisma.travel.updateMany({
                        where: { id: { in: travelsIds } },
                        data: {
                            status: 0,
                            canceledAt: new Date(),
                            cancelReason,
                            canceledBy: 'driver',
                        },
                    });
                    const promises2 = yield route.travels.map((travel) => (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
                        console.log(travel);
                        const payment = yield prisma.transaction.findFirst({ where: { travelId: travel.id, status: 1 } });
                        if (payment.status === 1) {
                            yield prisma.transaction.update({ where: { id: payment.id }, data: { status: 0 } });
                            const transactionId = (0, uuid_1.v4)();
                            console.log(delay, new Date());
                            if (delay) {
                                const sanction = Math.ceil((0.5 * (principal.price)) / 5) * 5;
                                console.log('sanction ', userId, sanction);
                                yield prisma.wallet.update({ where: { id: userId }, data: { balance: { decrement: sanction } } });
                            }
                            else
                                console.log('sanction false');
                            yield prisma.wallet.update({ where: { id: userId }, data: { balance: { increment: (principal.price + principal.commission + principal.fees) } } });
                            yield prisma.transaction.create({ data: { id: transactionId, amount: payment.amount, type: 'refund', ref: transactionId, walletId: travel.userId, status: 1 } });
                            notifyUser({ id: travel.userId, titleRef: { text: 'notification.removeTrip.title' }, messageRef: { text: 'notification.removeTrip.message' }, cover: null, data: { path: 'cancel-trip', id: id.toString(), res: 'INFOS' }, lang: 'fr', type: 'trip' });
                            saveTravel(travel.id);
                        }
                        return true;
                    }));
                    return Promise.all(promises2).then(() => true);
                }));
                return Promise.all(promises).then(() => {
                    saveTrip(id);
                    const message = { text: 'response.remove' };
                    return { message };
                });
            }
            if (status === 2) {
                const message = { text: 'response.remove' };
                return { message };
            }
            else {
                const message = { text: 'response.remove' };
                return { message };
            }
        }));
    });
}
exports.default = makeRemove;
//# sourceMappingURL=remove.js.map