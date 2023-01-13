"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const invalid_param_error_1 = require("./../../../utils/errors/invalid-param-error");
const errors_1 = require("../../../utils/errors");
const helpers_1 = require("../../../utils/helpers");
exports.default = ({ saveProfile } = {}) => {
    if (!saveProfile)
        throw new errors_1.ServerError();
    return ({ travelId, rating, comment }) => {
        if (!travelId)
            throw new errors_1.MissingParamError("travelId");
        if (!rating && !comment)
            throw new errors_1.MissingParamError("rating or comment");
        if (rating && rating > 5)
            throw new invalid_param_error_1.InvalidParamError('rating');
        const prisma = helpers_1.DbConnection.prisma;
        return prisma.$transaction(() => (0, tslib_1.__awaiter)(void 0, void 0, void 0, function* () {
            const { route } = yield prisma.travel.findUnique({ where: { id: travelId }, select: { route: { select: { trip: { select: { id: true, userId: true } } } } } });
            const userId = route.trip.userId;
            const tripId = route.trip.id;
            const review = yield prisma.driverReview.findUnique({ where: { travelId } });
            if (!review)
                yield prisma.driverReview.create({ data: { travelId, tripId, userId, rating, comment } });
            else
                yield prisma.driverReview.update({ where: { travelId }, data: { tripId, userId, rating, comment } });
            if (rating !== null && rating !== undefined) {
                const dirverRatings = yield prisma.driverReview.findMany({ where: { userId }, select: { rating: true } });
                const passengerRatings = yield prisma.passengerReview.findMany({ where: { userId }, select: { rating: true } });
                const ratings = dirverRatings.map(r => r.rating).concat(passengerRatings.map(r => r.rating));
                const sum = ratings.filter(r => r !== null).reduce((acc, rating) => acc + rating, 0);
                const q = ratings.length;
                let averageRating;
                if (q)
                    averageRating = sum / q;
                yield prisma.user.update({ where: { id: userId }, data: { rating: averageRating } });
            }
            const message = { text: "response.edit" };
            return { message };
        }));
    };
};
//# sourceMappingURL=rate-driver.js.map