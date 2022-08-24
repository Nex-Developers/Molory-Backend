import { ServerError } from "../../../utils/errors"

export default function makeListItems({
    tripDb
}: any = {}) {
    if (!tripDb) throw new ServerError()
    return async ({
        startAt,
        limit,
        userId,
        departure,
        arrival,
        date
    }: any = {}) => {
        if (!startAt) startAt = 0
        if (!limit) limit = 100
        const where: any = {}
        if (userId) where.userId = userId
        else where.status = 3
        if (date) {
            where.departureDate = date
        }
        let data = await tripDb.findMany({
            startAt,
            limit,
            where,
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
                },
                vehicle: {
                    select: {
                        id: true,
                        type: true,
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
                        stops: true,
                        // travels: true
                    }
                },
                createdAt: true
            }
        })
        if (departure && arrival) {
           data = data.filter( trip => trip.routes.find(route => route.stops.find(stop =>  stop.address.toLowerCase().includes(departure.toLowerCase()) && stop.type === 'departure')) && trip.routes.find(route => route.stops.find(stop =>  stop.address.toLowerCase().includes(arrival.toLowerCase()) && stop.type === 'arrival')))
        } else if (departure) {
           data = data.filter( trip => trip.routes.find(route => route.stops.find(stop => stop.address.toLowerCase().includes(departure.toLowerCase())  && stop.type === 'departure')))            
        } else  if (arrival) {
           data = data.filter( trip => trip.routes.find(route => route.stops.find(stop =>  stop.address.toLowerCase().includes(departure.toLowerCase()) && stop.type === 'arrival')))
        }

        return { count: data.length, startAt, limit, data }
    }
}