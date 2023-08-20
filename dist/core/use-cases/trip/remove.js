"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const unauthorized_error_1 = require("./../../../utils/errors/unauthorized-error");
const errors_1 = require("../../../utils/errors");
const helpers_1 = require("../../../utils/helpers");
const uuid_1 = require("uuid");
const firebase_1 = require("../../services/firebase");
function makeRemove({ tripDb, notifyUser, saveTrip, saveTravel } = {}) {
    if (!tripDb || !notifyUser || !saveTrip || !saveTravel)
        throw new errors_1.ServerError();
    const reformateDate = (date) => {
        return date.split("-").reverse().join("-");
    };
    const getLast48hours = (date) => {
        const maintenant = new Date();
        const differenceEnMillisecondes = date.getTime() - maintenant.getTime();
        const differenceEnHeures = differenceEnMillisecondes / (1000 * 60 * 60);
        return differenceEnHeures < 48;
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
                const departureDateTime = new Date(reformateDate(departureDate) + ' ' + departureTime);
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
                        const payment = yield prisma.transaction.findFirst({ where: { travelId: travel.id, status: 1 } });
                        console.log('payment ', payment);
                        if (payment && payment.status === 1) {
                            yield prisma.transaction.update({ where: { id: payment.id }, data: { status: 0 } });
                            if (delay) {
                                const sanction = Math.ceil((0.5 * principal.commission) / 5) * 5;
                                console.log('sanction ', userId, sanction);
                                const transactionId = (0, uuid_1.v4)();
                                yield prisma.wallet.update({ where: { id: userId }, data: { balance: { decrement: sanction } } });
                                yield prisma.transaction.create({ data: { id: transactionId, amount: payment.amount, type: 'refund', ref: transactionId, walletId: travel.userId, status: 1 } });
                            }
                            else
                                console.log('sanction false');
                            const transactionId = (0, uuid_1.v4)();
                            yield prisma.wallet.update({ where: { id: travel.userId }, data: { balance: { increment: (principal.price + principal.commission + principal.fees) } } });
                            yield prisma.transaction.create({ data: { id: transactionId, amount: payment.amount, type: 'refund', ref: transactionId, walletId: travel.userId, status: 1 } });
                            notifyUser({ id: travel.userId, titleRef: { text: 'notification.removeTrip.title' }, messageRef: { text: 'notification.removeTrip.message' }, cover: null, data: { path: 'cancel-trip', id: id.toString(), res: 'INFOS' }, lang: 'fr', type: 'trip' });
                            saveTravel(travel.id);
                            (0, firebase_1.saveProfile)(travel.userId);
                        }
                        return true;
                    }));
                    return Promise.all(promises2).then(() => true);
                }));
                return Promise.all(promises).then(() => {
                    saveTrip(id);
                    (0, firebase_1.saveProfile)(userId);
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