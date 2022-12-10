"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const errors_1 = require("../../../utils/errors");
const moment_1 = (0, tslib_1.__importDefault)(require("moment"));
function makeAdd({ tripDb, calculMatrix, } = {}) {
    if (!tripDb)
        throw new errors_1.ServerError();
    return ({ userId, vehicleId, seats, date, time, price, stops, description } = {}) => (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
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
        if (!description)
            description = null;
        const departures = JSON.parse(JSON.stringify(stops)).filter(stop => stop.type === 'departure' || stop.type === 'both');
        departures.map(departure => {
            if (departure.type !== 'departure') {
                departure.type = 'departure';
                departure.principal = false;
            }
            return departure;
        });
        if (!departures.length)
            throw new errors_1.MissingParamError('departure');
        const arrivals = JSON.parse(JSON.stringify(stops)).filter(stop => stop.type === 'arrival' || stop.type === 'both');
        arrivals.map(arrival => {
            if (arrival.type !== 'arrival') {
                arrival.type = 'arrival';
                arrival.principal = false;
            }
            return arrival;
        });
        if (!arrivals.length)
            throw new errors_1.MissingParamError('arrival');
        console.log(departures.length, arrivals.length);
        const routes = [];
        for (const departure of departures) {
            for (const arrival of arrivals) {
                if (departure.address === arrival.address)
                    break;
                const principal = (departure.principal && arrival.principal) ? true : false;
                const { distance, duration } = yield calculMatrix({ departure, arrival });
                let departureDate = date;
                let departureTime = time;
                if (!departure.principal) {
                    const principalDeparture = departures.find(departure => departure.principal);
                    const { duration } = yield calculMatrix({ departure: principalDeparture, arrival: departure });
                    console.log('duration to principal departure', duration);
                    const calculateDepartureDateTime = (0, moment_1.default)(departureDate + ' ' + departureTime).add(duration, 'hours');
                    console.log('Calculate departure datetime  ', calculateDepartureDateTime);
                    const [calDepartureDate, calDepartureTime] = (0, moment_1.default)(calculateDepartureDateTime).format('YYYY-MM-DD HH:MM').split(' ');
                    departureDate = calDepartureDate;
                    departureTime = calDepartureTime;
                }
                console.log(departureDate, departureTime, distance, duration);
                routes.push({
                    departureDate,
                    departureTime,
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
                description,
                routes: {
                    create: calculatedRoutes
                }
            },
            include: {
                routes: {
                    select: {
                        id: true,
                        departureDate: true,
                        departureTime: true,
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