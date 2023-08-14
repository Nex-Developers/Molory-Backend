"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const errors_1 = require("../../../utils/errors");
function makeListItemInfos({ tripDb } = {}) {
    if (!tripDb)
        throw new errors_1.ServerError();
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
                        commission: true,
                        principal: true,
                        departureDate: true,
                        departureTime: true,
                        stops: true,
                        travels: {
                            select: {
                                id: true,
                                seats: true,
                                passengerReview: {
                                    select: {
                                        rating: true,
                                        comment: true,
                                        createdAt: true,
                                        updatedAt: true,
                                        by: true
                                    }
                                },
                                driverReview: {
                                    select: {
                                        rating: true,
                                        comment: true,
                                        createdAt: true,
                                        updatedAt: true,
                                        by: true
                                    }
                                },
                                status: true,
                                createdAt: true,
                                user: {
                                    select: {
                                        id: true,
                                        avatar: true,
                                        firstName: true,
                                        lastName: true
                                    }
                                },
                            }
                        }
                    }
                },
                createdAt: true,
                reports: {
                    select: {
                        id: true,
                        description: true,
                        createdAt: true
                    }
                }
            }
        });
        const passengers = [];
        const route = res.routes.find(route => route.principal);
        const promises = res.routes.map((item) => (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const route = {
                id: item.id,
                distance: item.distance,
                duration: item.duration,
                departureDate: item.departureDate,
                departureTime: item.departureTime,
                price: item.price,
                fees: item.fees,
                commission: item.commission,
                stops: item.stops,
            };
            const promises = item.travels.map(booking => {
                const user = booking.user;
                const travel = {
                    id: booking.id, route, seats: booking.seats,
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
        delete route.travels;
        const data = {
            id: res.id,
            seats: res.seats,
            remainingSeats: res.remainingSeats,
            status: res.status,
            departureDate: res.departureDate,
            departureTime: res.departureTime,
            description: res.description,
            user: res.user,
            route,
            vehicle: res.vehicle,
            passengers,
            reports: res.reports
        };
        return { data };
    });
}
exports.default = makeListItemInfos;
//# sourceMappingURL=list-item-infos.js.map