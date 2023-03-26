"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const errors_1 = require("../../../utils/errors");
const moment_1 = (0, tslib_1.__importDefault)(require("moment"));
const helpers_1 = require("../../../utils/helpers");
function makeAdd({ calculMatrix, addTask, notifyUser, saveProfile, saveTrip } = {}) {
    if (!saveProfile || !calculMatrix || !addTask || !notifyUser || !saveTrip)
        throw new errors_1.ServerError();
    const reformateDate = (date) => {
        return date.split("-").reverse().join("-");
    };
    const getDayPlusQuater = (date) => {
        return new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes());
    };
    return ({ userId, vehicleId, seats, date, time, price, fees, stops, description } = {}) => (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
        if (!userId)
            throw new errors_1.MissingParamError('userId');
        if (!vehicleId)
            throw new errors_1.MissingParamError('vehicleId');
        if (!price)
            throw new errors_1.MissingParamError('price');
        if (!fees)
            throw new errors_1.MissingParamError('fees');
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
        const prisma = helpers_1.DbConnection.prisma;
        return yield prisma.$transaction(() => (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
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
            const routes = [];
            let departureAddress, arrivalAddress;
            for (const departure of departures) {
                const routeDepartureAddress = departure.address.substring(0, departure.address.indexOf(","));
                if (departure.principal) {
                    departureAddress = routeDepartureAddress;
                }
                for (const arrival of arrivals) {
                    if (departure.address === arrival.address)
                        break;
                    const routeArrivalAddress = arrival.address.substring(0, arrival.address.indexOf(","));
                    if (arrival.principal) {
                        arrivalAddress = routeArrivalAddress;
                    }
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
                    routes.push({
                        departureDate,
                        departureTime,
                        arrivalAddress: routeArrivalAddress,
                        departureAddress: routeDepartureAddress,
                        distance,
                        duration,
                        price,
                        fees,
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
                route.fees = Math.ceil(((route.distance / principalRoute.distance) * fees) / 5) * 5;
                return route;
            });
            calculatedRoutes.unshift(principalRoute);
            console.log(departureAddress, arrivalAddress);
            const trip = yield prisma.trip.create({
                data: {
                    seats,
                    remainingSeats: seats,
                    departureDate: date,
                    departureTime: time,
                    departureAddress,
                    arrivalAddress,
                    description,
                    user: {
                        connect: { id: userId }
                    },
                    routes: {
                        create: calculatedRoutes
                    },
                    vehicle: {
                        connect: { id: vehicleId }
                    }
                },
                include: {
                    vehicle: {
                        select: {
                            id: true,
                            numberPlate: true,
                            model: true,
                            type: true,
                            color: true
                        }
                    },
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
                            fees: true,
                            stops: true
                        }
                    }
                }
            });
            const formatedDate = reformateDate(trip.departureDate);
            const tripDate = new Date(formatedDate + ' ' + trip.departureTime);
            const timer = getDayPlusQuater(tripDate);
            addTask({ timer, path: 'trip-start', params: { id: trip.id } });
            notifyUser({ id: userId, titleRef: { text: 'notification.addTrip.title' }, messageRef: { text: 'notification.addTrip.message', params: { departure: departureAddress, arrival: arrivalAddress, date, time } }, cover: null, data: { path: 'add-trip', id: trip.id.toString(), res: 'SUCCESS' }, lang: 'fr', type: 'trip' });
            saveProfile(userId);
            saveTrip(trip.id);
            const message = { text: "response.add" };
            return { message, data: trip };
        }));
    });
}
exports.default = makeAdd;
//# sourceMappingURL=add.js.map