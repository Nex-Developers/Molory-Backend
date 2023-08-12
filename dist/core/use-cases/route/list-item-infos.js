"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const errors_1 = require("../../../utils/errors");
const helpers_1 = require("../../../utils/helpers");
function makeListItemInfos() {
    return ({ id } = {}) => (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
        const prisma = helpers_1.DbConnection.prisma;
        if (!id)
            throw new errors_1.MissingParamError('id');
        const res = yield prisma.route.findUnique({
            where: {
                id
            },
            select: {
                id: true,
                departureDate: true,
                departureTime: true,
                distance: true,
                duration: true,
                price: true,
                fees: true,
                commission: true,
                principal: true,
                remainingSeats: true,
                stops: {
                    select: {
                        id: true,
                        type: true,
                        principal: true,
                        longitude: true,
                        latitude: true,
                        address: true,
                        town: true
                    }
                },
                trip: {
                    select: {
                        id: true,
                        seats: true,
                        remainingSeats: true,
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
                                }
                            }
                        },
                        vehicle: {
                            select: {
                                id: true,
                                numberPlate: true,
                                model: true,
                                type: true,
                                color: true
                            }
                        }
                    }
                },
            }
        });
        const data = {
            id: res.id,
            remainingSeats: res.remainingSeats,
            departureDate: res.departureDate,
            departureTime: res.departureTime,
            distance: res.distance,
            duration: res.duration,
            price: res.price + res.fees + res.commission,
            stops: res.stops,
            driver: res.trip.user,
            vehicle: res.trip.vehicle
        };
        return { data };
    });
}
exports.default = makeListItemInfos;
//# sourceMappingURL=list-item-infos.js.map