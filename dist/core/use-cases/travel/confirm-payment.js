"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const errors_1 = require("../../../utils/errors");
const helpers_1 = require("../../../utils/helpers");
function makeConfirmPayment({ saveProfile, saveTravel, saveTrip, notifyUser, addTask, }) {
    if (!saveProfile || !saveTravel || !saveTrip || !notifyUser)
        throw new errors_1.ServerError();
    const reformateDate = (date) => {
        return date.split("-").reverse().join("-");
    };
    const getDatePlusQuater = (date) => {
        return new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes());
    };
    return ({ id, status, amount, method, reference, validatedAt } = {}) => (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
        const prisma = helpers_1.DbConnection.prisma;
        console.log('Confirm-payment called with ', id, status, amount, reference);
        if (!status) {
            const message = { text: "response.delete" };
            return { message };
        }
        const saved = yield helpers_1.CacheManager.get(id);
        if (!saved)
            throw new errors_1.ExpiredParamError('payement id');
        const data = JSON.parse(saved);
        if (!method)
            method = 'wallet';
        if (!validatedAt)
            validatedAt = new Date();
        if (!reference)
            reference = null;
        const { remainingSeats, principal, trip, departureAddress, departureDate, departureTime, arrivalAddress } = yield prisma.route.findUnique({
            where: { id: data.routeId },
            select: { remainingSeats: true, principal: true, trip: true, departureAddress: true, departureTime: true, departureDate: true, arrivalAddress: true }
        });
        if (!trip.remainingSeats)
            throw new errors_1.InvalidParamError('Unvailable seats');
        if (data.seats > remainingSeats)
            throw new errors_1.InvalidParamError('Missing ' + (data.seats - remainingSeats) + ' seats');
        const travel = yield prisma.travel.create({
            data: {
                seats: data.seats,
                description: data.description,
                departureAddress,
                arrivalAddress,
                departureDate,
                departureTime,
                route: {
                    connect: { id: data.routeId }
                },
                user: {
                    connect: { id: data.userId }
                }
            },
            include: { route: true, user: true }
        });
        const payment = {
            id,
            amount: data.amount,
            ref: reference,
            validatedAt,
            type: 'payment',
            method,
            status: 1,
            walletId: data.userId,
            travelId: travel.id,
        };
        if (data.promotionId)
            payment.create.promotion = { connect: { id: data.promotionId } };
        yield prisma.transaction.create({ data: payment });
        if (method === 'wallet')
            yield prisma.wallet.update({ where: { id: data.userId }, data: { balance: { decrement: amount } } });
        if (principal) {
            yield prisma.route.update({ where: { id: data.routeId }, data: { remainingSeats: { decrement: data.seats, } } });
            yield prisma.trip.update({ where: { id: trip.id }, data: { remainingSeats: { decrement: data.seats, } } });
        }
        else {
            yield prisma.route.update({ where: { id: data.routeId }, data: { remainingSeats: { decrement: data.seats, } } });
            const secondaryRoutes = yield prisma.route.findMany({ where: { principal: false }, select: { remainingSeats: true } });
            if (secondaryRoutes.length) {
                const A = secondaryRoutes[0].remainingSeats;
                const B = secondaryRoutes[1].remainingSeats;
                if (A !== B) {
                    prisma.route.updateMany({ where: { id: data.routeId, principal: true }, data: { remainingSeats: { decrement: data.seats, } } });
                    yield prisma.trip.update({ where: { id: trip.id }, data: { remainingSeats: { decrement: data.seats, } } });
                }
            }
        }
        yield helpers_1.CacheManager.remove(id);
        saveProfile(travel.userId);
        saveTravel(travel.id);
        saveTrip(trip.id);
        notifyUser({ id: travel.userId, titleRef: { text: 'notification.addTravel.title' }, messageRef: { text: 'notification.addTravel.message', params: { seats: data.seats, departure: departureAddress, arrival: arrivalAddress, date: departureDate, time: departureTime } }, cover: null, data: { path: 'add-travel', id: id.toString(), res: 'SUCCESS' }, lang: 'fr', type: 'travel' });
        notifyUser({ id: trip.userId, titleRef: { text: 'notification.bookTrip.title' }, messageRef: { text: 'notification.bookTrip.message', params: { name: travel.user.firstName, seats: data.seats, departure: departureAddress, arrival: arrivalAddress, date: departureDate, time: departureTime } }, cover: null, data: { path: 'add-travel', id: id.toString(), res: 'INFOS' }, lang: 'fr', type: 'travel' });
        const formatedDate = reformateDate(travel.route.departureDate);
        const date = new Date(formatedDate + ' ' + travel.route.departureTime);
        const timer = getDatePlusQuater(date);
        addTask({ path: 'ask-to-start-travel', timer, params: { id: travel.id } });
        delete data.user;
        const message = { text: "response.add", data: travel };
        return { message, id: travel.id };
    });
}
exports.default = makeConfirmPayment;
//# sourceMappingURL=confirm-payment.js.map