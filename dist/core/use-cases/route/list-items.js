"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const errors_1 = require("../../../utils/errors");
function makeListItemInfos({ routeDb } = {}) {
    if (!routeDb)
        throw new errors_1.ServerError();
    return ({ startAt, limit, departure, arrival, date } = {}) => (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
        if (!startAt)
            startAt = 0;
        if (!limit)
            limit = 100;
        const where = { trip: { status: 3, remainingSeats: { gt: 0 } } };
        if (date)
            where.trip.departureDate = date;
        const routes = yield routeDb.findMany({
            startAt,
            limit,
            where,
            select: {
                id: true,
                distance: true,
                duration: true,
                price: true,
                principal: true,
                remainingSeats: true,
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
                                phoneNumber: true
                            }
                        }
                    }
                },
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
                }
            }
        });
        const data = routes.filter(route => route.stops.find(stop => stop.address.toLowerCase().includes(departure.toLowerCase()) && stop.type == 'departure')
            && route.stops.find(stop => stop.address.toLowerCase().includes(arrival.toLowerCase()) && stop.type == 'arrival'));
        return { data };
    });
}
exports.default = makeListItemInfos;
//# sourceMappingURL=list-items.js.map