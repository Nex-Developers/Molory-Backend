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
            where.departureDate = date;
        const routes = yield routeDb.findMany({
            startAt,
            limit,
            where,
            select: {
                id: true,
                departureDate: true,
                departureTime: true,
                distance: true,
                duration: true,
                price: true,
                fees: true,
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
                }
            }
        });
        const data = routes.filter(route => route.stops.find(stop => stop.address.toLowerCase().includes(departure.toLowerCase()) && stop.type == 'departure')
            && route.stops.find(stop => stop.address.toLowerCase().includes(arrival.toLowerCase()) && stop.type == 'arrival'))
            .map(route => {
            route.price = route.price + route.fees;
            delete route.fees;
            return route;
        });
        return { data };
    });
}
exports.default = makeListItemInfos;
//# sourceMappingURL=list-items.js.map