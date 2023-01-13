"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const errors_1 = require("../../../utils/errors");
function makeListItemInfos({ tripDb } = {}) {
    if (!tripDb)
        throw new errors_1.ServerError();
    const orderPreferences = (data) => {
        return data.sort((a, b) => a.question.id - b.question.id);
    };
    return ({ id } = {}) => (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
        if (!id)
            throw new errors_1.MissingParamError('id');
        const res = yield tripDb.findFirst({
            where: {
                id
            },
            select: {
                id: true,
                seats: true,
                remainingSeats: true,
                status: true,
                departureDate: true,
                departureTime: true,
                description: true,
                user: {
                    select: {
                        id: true,
                        avatar: true,
                        firstName: true,
                        lastName: true,
                        phoneNumber: true
                    }
                },
                vehicle: {
                    select: {
                        id: true,
                        type: true,
                        model: true,
                        color: true,
                        numberPlate: true,
                        registrationDoc: true
                    }
                },
                routes: {
                    select: {
                        id: true,
                        distance: true,
                        duration: true,
                        price: true,
                        fees: true,
                        stops: true,
                        travels: {
                            select: {
                                seats: true,
                                passengerReview: { select: {
                                        rating: true,
                                        comment: true,
                                        createdAt: true,
                                        updatedAt: true
                                    } },
                                driverReview: { select: {
                                        rating: true,
                                        comment: true,
                                        createdAt: true,
                                        updatedAt: true
                                    } },
                                status: true,
                                createdAt: true,
                                user: {
                                    select: {
                                        id: true,
                                        avatar: true,
                                        firstName: true,
                                        lastName: true,
                                        phoneNumber: true,
                                        passengerReviews: true,
                                        driverReviews: true,
                                        preferences: true
                                    }
                                },
                            }
                        }
                    }
                },
                createdAt: true
            }
        });
        const passengers = [];
        const promises = res.routes.map((item) => (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const route = {
                id: true,
                distance: true,
                duration: true,
                price: true,
                fees: true,
                stops: true,
            };
            const promises = item.route.travels.map(booking => {
                const allReviews = booking.user.passengerReviews.concat(booking.user.driverReviews);
                const reviews = allReviews.sort((a, b) => b.createdAt - a.createdAt);
                delete booking.user.driverReviews;
                delete booking.user.passengerReviews;
                booking.user.preferences = orderPreferences(booking.user.preferences);
                const user = Object.assign(Object.assign({}, booking.user), { reviews });
                const travel = { route, seats: booking.seats,
                    passengerReview: booking.passengerReview,
                    driverReview: booking.driverReview,
                    status: booking.status,
                    createdAt: booking.createdAt
                };
                return passengers.push({ user, travel });
            });
            return yield Promise.all(promises);
        }));
        yield Promise.all(promises);
        const data = {
            id: res.id,
            seats: res.seats,
            remainingSeats: res.seats,
            status: res.status,
            departureDate: res.departureDate,
            departureTime: res.departuereTime,
            description: res.description,
            user: res.user,
            vehicle: res.vehicle,
            passengers
        };
        return { data };
    });
}
exports.default = makeListItemInfos;
//# sourceMappingURL=list-item-infos.js.map