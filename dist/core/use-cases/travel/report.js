"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const errors_1 = require("../../../utils/errors");
const helpers_1 = require("../../../utils/helpers");
exports.default = ({ saveProfile, saveTravel, saveTrip, notifyUser } = {}) => {
    if (!saveProfile || !saveTravel || !saveTrip || !notifyUser)
        throw new errors_1.ServerError();
    return ({ travelId, rating, comment, by }) => {
        if (!travelId)
            throw new errors_1.MissingParamError("travelId");
        if (!rating && !comment)
            throw new errors_1.MissingParamError("rating or comment");
        if (!by)
            throw new errors_1.MissingParamError("by");
        if (rating) {
            if (typeof rating === "string")
                rating = Number(rating);
            if (rating < 0 && rating > 5)
                throw new errors_1.InvalidParamError('rating');
        }
        const prisma = helpers_1.DbConnection.prisma;
        return prisma.$transaction(() => (0, tslib_1.__awaiter)(void 0, void 0, void 0, function* () {
            const travel = yield prisma.travel.findUnique({ where: { id: travelId }, select: { route: { select: { trip: { select: { id: true, departureAddress: true, arrivalAddress: true, departureDate: true, departureTime: true, userId: true } } } } } });
            if (!travel)
                throw new errors_1.InvalidParamError('travelId');
            const { route } = travel;
            const userId = route.trip.userId;
            const tripId = route.trip.id;
            const review = yield prisma.driverReview.findUnique({ where: { travelId } });
            if (!review)
                yield prisma.driverReview.create({ data: { travelId, tripId, userId, rating, comment, by } });
            else
                yield prisma.driverReview.update({ where: { travelId }, data: { tripId, userId, rating, comment, by } });
            if (rating) {
                const dirverRatings = yield prisma.driverReview.findMany({ where: { userId }, select: { rating: true } });
                const passengerRatings = yield prisma.passengerReview.findMany({ where: { userId }, select: { rating: true } });
                const ratings = dirverRatings.map(r => r.rating).concat(passengerRatings.map(r => r.rating));
                const sum = ratings.filter(r => r !== null).reduce((acc, rating) => acc + rating, 0);
                const q = ratings.length;
                let averageRating;
                if (q)
                    averageRating = sum / q;
                yield prisma.user.update({ where: { id: userId }, data: { rating: Number(averageRating.toFixed(1)) } });
                saveProfile(userId);
            }
            saveTravel(travelId);
            saveTrip(route.trip.id);
            notifyUser({ id: userId, titleRef: { text: 'notification.rateTravelDriver.title' }, messageRef: { text: 'notification.rateTravelDriver.message', params: { departure: travel.route.trip.departureAddress, arrival: travel.route.trip.arrivalAddress, date: travel.route.trip.departureDate, time: travel.route.trip.departureTime } }, cover: null, data: { path: 'rate-driver', id: travelId.toString(), res: 'INFOS' }, lang: 'fr', type: 'travel' });
            const message = { text: "response.edit" };
            return { message };
        }));
    };
};
//# sourceMappingURL=report.js.map