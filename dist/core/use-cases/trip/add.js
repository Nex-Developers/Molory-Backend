"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const errors_1 = require("../../../utils/errors");
function makeAdd({ tripDb, calculMatrix, } = {}) {
    if (!tripDb)
        throw new errors_1.ServerError();
    return ({ userId, vehicleId, seats, date, time, price, stops } = {}) => (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
        if (!userId)
            throw new errors_1.MissingParamError('userId');
        if (!price)
            throw new errors_1.MissingParamError('price');
        if (!seats)
            throw new errors_1.MissingParamError('seats');
        if (!date)
            throw new errors_1.MissingParamError('date');
        if (!time)
            throw new errors_1.MissingParamError('time');
        if (!stops && !stops.length)
            throw new errors_1.MissingParamError('stops');
        const departures = stops.filter(stop => stop.type === 'departure' || stop.type === 'both');
        if (!departures.length)
            throw new errors_1.MissingParamError('departure');
        const arrivals = stops.filter(stop => stop.type === 'arrival' || stop.type === 'both');
        if (!arrivals.length)
            throw new errors_1.MissingParamError('arrival');
        const routes = [];
        for (const departure of departures) {
            for (const arrival of arrivals) {
                const principal = (departure.principal && arrival.principal) ? true : false;
                if (departure.address == arrival.address)
                    break;
                if (!departure.type) {
                    departure.type = 'departure';
                    departure.principal = false;
                }
                if (!arrival.type) {
                    arrival.type = 'arrival';
                    arrival.principal = false;
                }
                const { distance, duration } = yield calculMatrix({ departure, arrival });
                console.log(distance, duration, price);
                routes.push({
                    distance,
                    duration,
                    price,
                    principal,
                    remainingSeats: seats,
                    stops: {
                        create: [departure, arrival]
                    }
                });
            }
        }
        const principalRoute = routes.find(route => route.principal);
        const calculatedRoutes = routes.filter(route => !route.principal).map(route => {
            route.price = Math.ceil(((route.distance / principalRoute.distance) * price) / 5) * 5;
            return route;
        });
        calculatedRoutes.unshift(principalRoute);
        console.log(calculatedRoutes);
        const trip = yield tripDb.insertOne({
            data: {
                userId,
                vehicleId,
                seats,
                remainingSeats: seats,
                departureDate: date,
                departureTime: time,
                routes: {
                    create: calculatedRoutes
                }
            },
            include: {
                routes: {
                    select: {
                        id: true,
                        distance: true,
                        duration: true,
                        principal: true,
                        remainingSeats: true,
                        price: true,
                        stops: true
                    }
                }
            }
        });
        const message = { text: "response.add" };
        return { message, data: trip };
    });
}
exports.default = makeAdd;
//# sourceMappingURL=add.js.map