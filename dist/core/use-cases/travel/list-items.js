"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const moment_1 = (0, tslib_1.__importDefault)(require("moment"));
const errors_1 = require("../../../utils/errors");
const helpers_1 = require("../../../utils/helpers");
function makeListItems({ travelDb } = {}) {
    if (!travelDb)
        throw new errors_1.ServerError();
    const orderPreferences = (data) => {
        return data.sort((a, b) => a.question.id - b.question.id);
    };
    return ({ userId, startAt, limit } = {}) => (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
        const prisma = helpers_1.DbConnection.prisma;
        if (!startAt)
            startAt = 0;
        if (!limit)
            limit = 100;
        const where = {};
        if (userId)
            where.userId = userId;
        const res = yield prisma.travel.findMany({
            where,
            orderBy: {
                id: 'desc'
            },
            select: {
                id: true,
                seats: true,
                status: true,
                description: true,
                departureAddress: true,
                arrivalAddress: true,
                departureDate: true,
                departureTime: true,
                passengerReview: { select: {
                        rating: true,
                        comment: true,
                        createdAt: true,
                        updatedAt: true,
                        by: true
                    } },
                driverReview: { select: {
                        rating: true,
                        comment: true,
                        createdAt: true,
                        updatedAt: true,
                        by: true
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
                user: {
                    select: {
                        id: true,
                        avatar: true,
                        firstName: true,
                        lastName: true,
                        phoneNumber: true,
                    }
                },
                refund: true,
                createdAt: true,
                reports: {
                    select: {
                        id: true,
                        description: true,
                        createdAt: true,
                        user: {
                            select: {
                                id: true,
                                avatar: true,
                                firstName: true,
                                lastName: true,
                                phoneNumber: true,
                            }
                        }
                    }
                }
            }
        });
        const data = [];
        res.forEach(item => {
            const _a = item.route, { trip } = _a, route = (0, tslib_1.__rest)(_a, ["trip"]);
            const { user, vehicle } = trip, _trip = (0, tslib_1.__rest)(trip, ["user", "vehicle"]);
            const allReviews = user.passengerReviews.concat(user.driverReviews);
            user.reviews = allReviews.sort((a, b) => b.createdAt - a.createdAt);
            user.preferences = orderPreferences(user.preferences);
            route.price += route.fees;
            delete route.fees;
            delete user.driverReviews;
            delete user.passengerReviews;
            data.push({
                id: item.id,
                seats: item.seats,
                status: item.status,
                description: item.description,
                departureAddress: item.departureAddress,
                arrivalAddress: item.arrivalAddress,
                departureDate: item.departureDate,
                departureTime: item.departureTime,
                createdAt: (0, moment_1.default)(item.createdAt).format('DD-MM-YYYY HH:mm'),
                passengerReview: item.passengerReview,
                driverReview: item.driverReview,
                route,
                trip: _trip,
                driver: user,
                user: item.user,
                vehicle,
                refund: item.refund,
                reports: item.reports
            });
        });
        return { data };
    });
}
exports.default = makeListItems;
//# sourceMappingURL=list-items.js.map