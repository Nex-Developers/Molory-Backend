import { MissingParamError, ServerError } from "../../../utils/errors"
import moment from 'moment'

export default function makeAdd({
    tripDb,
    // vehicleDb,
    // pricingDb,
    calculMatrix,
    // calculPrice
}: any = {}) {
    if (!tripDb) throw new ServerError()
    return async ({
        userId,
        vehicleId,
        seats,
        date,
        time,
        price,
        stops
    }: any = {}) => {
        if (!userId) throw new MissingParamError('userId')
        // if (!vehicleId) throw new MissingParamError('vehicleId')
        if (!price) throw new MissingParamError('price')
        if (!seats) throw new MissingParamError('seats')
        if (!date) throw new MissingParamError('date')
        if (!time) throw new MissingParamError('time')
        if (!stops && !stops.length) throw new MissingParamError('stops')

        const departures = JSON.parse(JSON.stringify(stops)).filter(stop => stop.type === 'departure' || stop.type === 'both')
            departures.map(departure => {
                if (departure.type !== 'departure') {
                    departure.type = 'departure'
                    departure.principal = false
                }
                // departure.principal = true
                return departure
            })
        if (!departures.length) throw new MissingParamError('departure')

        const arrivals = JSON.parse(JSON.stringify(stops)).filter(stop => stop.type === 'arrival' || stop.type === 'both')
        arrivals.map(arrival => {
            if (arrival.type !== 'arrival') {
                arrival.type = 'arrival'
                arrival.principal = false
            }
            // arrival.principal = true
            return arrival
        })
        if (!arrivals.length) throw new MissingParamError('arrival')
        console.log(departures.length, arrivals.length);

        // const vehicle = await vehicleDb.findFirst({ where: { id: vehicleId }})
        // const pricing = await pricingDb.findMany({ where: { vehicleTypeName: vehicle.type }, select: { lowerDistance: true, upperDistance: true, unitPrice: true}})
        const routes = []
        for (const departure of departures) {
            for (const arrival of arrivals) {
                if(departure.address === arrival.address) break
                const principal = (departure.principal && arrival.principal) ? true : false
                const { distance, duration } = await calculMatrix({ departure, arrival })
                // calculPrice({ distance, pricing })
                // const price = distance * 15
                let departureDate = date
                let departureTime = time

                if (!departure.principal) {
                    const principalDeparture = departures.find(departure => departure.principal)
                    const { duration } = await calculMatrix({ departure: principalDeparture, arrival: departure })
                    console.log('duration to principal departure', duration)
                    // const dateObj = new Date(departureDate + departureTime)
                    const calculateDepartureDateTime = moment(departureDate + ' ' + departureTime).add(duration, 'hours')
                    console.log('Calculate departure datetime  ', calculateDepartureDateTime)
                    const [calDepartureDate, calDepartureTime] = moment(calculateDepartureDateTime).format('YYYY-MM-DD HH:MM').split(' ')
                    departureDate = calDepartureDate
                    departureTime = calDepartureTime
                }
                console.log(departureDate, departureTime, distance, duration)
                routes.push(
                    {
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
                    }
                )
            }
        }

        const principalRoute = routes.find(route => route.principal);
        const calculatedRoutes = routes.filter(route => !route.principal).map(route => {
            route.price = Math.ceil(((route.distance / principalRoute.distance) * price) / 5) * 5
            return route
        })
        calculatedRoutes.unshift(principalRoute);
        console.log(calculatedRoutes);
        const trip = await tripDb.insertOne({
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
        })
        const message = { text: "response.add" }
        return { message, data: trip }
    }
}