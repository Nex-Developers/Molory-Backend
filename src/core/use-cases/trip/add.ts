import { MissingParamError, ServerError } from "../../../utils/errors"
import moment from 'moment'
import { DbConnection } from "../../../utils/helpers"

export default function makeAdd({
    // tripDb,
    // vehicleDb,
    // pricingDb,
    calculMatrix,
    addTask,
    notifyUser,
    saveProfile,
    saveTrip
    // calculPrice
}: any = {}) {
    if (!saveProfile || !calculMatrix || !addTask || !notifyUser || !saveTrip) throw new ServerError()

    const reformateDate = (date: string) => {
        return date.split("-").reverse().join("-")
    }

    const getDayPlusQuater = (date: Date) => {
        return new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes());
    }

    return async ({
        userId,
        vehicleId,
        seats,
        date,
        time,
        price,
        fees,
        stops,
        description
    }: any = {}) => {
        if (!userId) throw new MissingParamError('userId')
        if (!vehicleId) throw new MissingParamError('vehicleId')
        if (!price) throw new MissingParamError('price')
        if (!fees) throw new MissingParamError('fees')
        if (!seats) throw new MissingParamError('seats')
        if (!date) throw new MissingParamError('date')
        if (!time) throw new MissingParamError('time')
        if (!stops && !stops.length) throw new MissingParamError('stops')
        if (!description) description = null

        const prisma = DbConnection.prisma
        return await prisma.$transaction(async () => {
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
            // console.log(departures.length, arrivals.length);

            // const vehicle = await vehicleDb.findFirst({ where: { id: vehicleId }})
            // const pricing = await pricingDb.findMany({ where: { vehicleTypeName: vehicle.type }, select: { lowerDistance: true, upperDistance: true, unitPrice: true}})
            const routes = []
            let departureAddress, arrivalAddress
            for (const departure of departures) {
                const routeDepartureAddress = departure.address.substring(0, departure.address.indexOf(","))
                if (departure.principal){
                    departureAddress = routeDepartureAddress
                }
                for (const arrival of arrivals) {
                    if (departure.address === arrival.address) break
                    const routeArrivalAddress = arrival.address.substring(0, arrival.address.indexOf(","))
                    if (arrival.principal){
                        arrivalAddress = routeArrivalAddress
                    }
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
                    routes.push(
                        {
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
                        }
                    )
                }
            }

            const principalRoute = routes.find(route => route.principal);
            const calculatedRoutes = routes.filter(route => !route.principal).map(route => {
                route.price = Math.ceil(((route.distance / principalRoute.distance) * price) / 5) * 5
                route.fees = Math.ceil(((route.distance / principalRoute.distance) * fees) / 5) * 5
                return route
            })
            calculatedRoutes.unshift(principalRoute);
            // console.log(calculatedRoutes);
            console.log(departureAddress, arrivalAddress)
            const trip = await prisma.trip.create({
                data: {
                    seats,
                    remainingSeats: seats,
                    departureDate: date,
                    departureTime: time,
                    departureAddress,
                    arrivalAddress,
                    description,
                    user: {
                        connect: { id: userId}
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
            })
            // add Task,
            const formatedDate = reformateDate(trip.departureDate)
            const tripDate = new Date(formatedDate + ' ' + trip.departureTime)
            const timer = getDayPlusQuater(tripDate)
            addTask({ timer, path: 'trip-start', params: { id: trip.id } })
            // notify device
            notifyUser({ id: userId, titleRef: { text: 'notification.addTrip.title'}, messageRef: { text: 'notification.addTrip.message', params: { departure: departureAddress, arrival: arrivalAddress, date, time}}, cover: null, data: { path: 'add-trip', id: trip.id.toString(), res:'SUCCESS'}, lang: 'fr', type: 'trip' })
            saveProfile(userId)
            saveTrip(trip.id)
            const message = { text: "response.add" }
            return { message, data: trip }
        })

    }
}