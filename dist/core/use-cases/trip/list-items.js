"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const errors_1 = require("../../../utils/errors");
function makeListItems({ tripDb } = {}) {
    if (!tripDb)
        throw new errors_1.ServerError();
    return ({ startAt, limit, userId, departure, arrival, date } = {}) => (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
        if (!startAt)
            startAt = 0;
        if (!limit)
            limit = 100;
        const where = {};
        if (userId)
            where.userId = userId;
        if (date) {
            where.departureDate = date;
        }
        let data = yield tripDb.findMany({
            startAt,
            limit,
            where,
            orderBy: {
                id: 'desc'
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
                        commission: true,
                        fees: true,
                        stops: {
                            select: {
                                id: true,
                                type: true,
                                longitude: true,
                                latitude: true,
                                address: true,
                                town: true
                            }
                        },
                    }
                },
                createdAt: true
            }
        });
        if (departure && arrival) {
            data = data.filter(trip => trip.routes.find(route => route.stops.find(stop => stop.address.toLowerCase().includes(departure.toLowerCase()) && stop.type === 'departure')) && trip.routes.find(route => route.stops.find(stop => stop.address.toLowerCase().includes(arrival.toLowerCase()) && stop.type === 'arrival')));
        }
        else if (departure) {
            data = data.filter(trip => trip.routes.find(route => route.stops.find(stop => stop.address.toLowerCase().includes(departure.toLowerCase()) && stop.type === 'departure')));
        }
        else if (arrival) {
            data = data.filter(trip => trip.routes.find(route => route.stops.find(stop => stop.address.toLowerCase().includes(departure.toLowerCase()) && stop.type === 'arrival')));
        }
        return { count: data.length, startAt, limit, data };
    });
}
exports.default = makeListItems;
//# sourceMappingURL=list-items.js.map