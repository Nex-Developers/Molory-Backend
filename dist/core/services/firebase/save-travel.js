"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const server_error_1 = require("./../../../utils/errors/server-error");
const helpers_1 = require("../../../utils/helpers");
function makeSaveNotification({ setInCollection } = {}) {
    if (!setInCollection)
        throw new server_error_1.ServerError();
    const orderPreferences = (data) => {
        return data.sort((a, b) => a.question.id - b.question.id);
    };
    return (id) => (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
        const prisma = helpers_1.DbConnection.prisma;
        const travel = yield prisma.travel.findUnique({ where: { id },
            select: {
                id: true,
                seats: true,
                status: true,
                description: true,
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
                route: {
                    select: {
                        id: true,
                        price: true,
                        fees: true,
                        distance: true,
                        duration: true,
                        departureDate: true,
                        departureTime: true,
                        stops: true,
                        trip: {
                            select: {
                                status: true,
                                departureDate: true,
                                departureTime: true,
                                user: {
                                    select: {
                                        id: true,
                                        avatar: true,
                                        firstName: true,
                                        lastName: true,
                                        phoneNumber: true,
                                        rating: true,
                                        passengerReviews: { select: {
                                                rating: true,
                                                comment: true,
                                                createdAt: true,
                                                updatedAt: true
                                            } },
                                        driverReviews: { select: {
                                                rating: true,
                                                comment: true,
                                                createdAt: true,
                                                updatedAt: true
                                            } },
                                        preferences: {
                                            select: {
                                                question: {
                                                    select: {
                                                        id: true,
                                                        value: true,
                                                    }
                                                },
                                                answer: {
                                                    select: {
                                                        id: true,
                                                        index: true,
                                                        value: true,
                                                    }
                                                }
                                            }
                                        },
                                    }
                                }, vehicle: {
                                    select: {
                                        id: true,
                                        numberPlate: true,
                                        model: true,
                                        type: true,
                                        color: true
                                    }
                                },
                            }
                        }
                    }
                },
                refund: true,
                user: {
                    select: {
                        id: true,
                        avatar: true,
                        firstName: true,
                        lastName: true,
                        phoneNumber: true,
                    }
                },
                createdAt: true
            }
        });
        const _a = travel.route, { trip } = _a, route = (0, tslib_1.__rest)(_a, ["trip"]);
        const { user, vehicle } = trip, _trip = (0, tslib_1.__rest)(trip, ["user", "vehicle"]);
        const allReviews = user.passengerReviews.concat(user.driverReviews);
        user.reviews = allReviews.sort((a, b) => b.createdAt - a.createdAt);
        user.preferences = orderPreferences(user.preferences);
        route.price += route.fees;
        delete route.fees;
        delete user.driverReviews;
        delete user.passengerReviews;
        const data = {
            id,
            seats: travel.seats,
            status: travel.status,
            description: travel.description,
            createdAt: travel.createdAt,
            passengerReview: travel.passengerReview,
            driverReview: travel.driverReview,
            route,
            trip: _trip,
            driver: user,
            user: travel.user,
            vehicle,
            refund: travel.refund
        };
        return yield setInCollection('users', travel.user.id.toString(), 'travels', id.toString(), data);
    });
}
exports.default = makeSaveNotification;
//# sourceMappingURL=save-travel.js.map