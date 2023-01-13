"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const errors_1 = require("../../../utils/errors");
function makeListItems({ travelDb } = {}) {
    if (!travelDb)
        throw new errors_1.ServerError();
    return ({ userId, startAt, limit } = {}) => (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
        if (!startAt)
            startAt = 0;
        if (!limit)
            limit = 100;
        const where = {};
        if (userId)
            where.userId = userId;
        const res = yield travelDb.findMany({
            startAt,
            limit,
            where,
            orderBy: {
                id: 'desc'
            },
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
                                        rating: true
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
                        phoneNumber: true
                    }
                },
                createdAt: true
            }
        });
        const data = [];
        res.forEach(item => {
            const _a = item.route, { trip } = _a, route = (0, tslib_1.__rest)(_a, ["trip"]);
            const { user, vehicle } = trip, _trip = (0, tslib_1.__rest)(trip, ["user", "vehicle"]);
            data.push({
                id: item.id,
                seats: item.seats,
                status: item.status,
                description: item.description,
                createdAt: item.createdAt,
                passengerReview: item.passengerReview,
                driverReview: item.driverReview,
                route,
                trip: _trip,
                driver: user,
                vehicle,
                user: item.user
            });
        });
        return { data };
    });
}
exports.default = makeListItems;
//# sourceMappingURL=list-items.js.map