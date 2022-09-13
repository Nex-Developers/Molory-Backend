import { ServerError } from "../../../utils/errors"

export default function makeListItemInfos({
    routeDb
}: any = {}) {
    if (!routeDb) throw new ServerError()
    return async ({
        startAt,
        limit,
        departure,
        arrival,
        date
    }: any = {}) => {
        if (!startAt) startAt = 0
        if (!limit) limit = 100
        const where: any = { trip: { status: 3, remainingSeats: { gt: 0}}}
        if(date) where.trip.departureDate = date
        if (departure && arrival) where.trip.stops = {AND: [{ address: departure, type: 'departure' }, { address: arrival, type: 'arrival' }]}
        else if (departure) where.trip.stops = {address: departure, type: 'departure'}
        else if (arrival) where.trip.stops = {address: arrival, type: 'arrival'}
        

        const data = await routeDb.findMany({
            startAt,
            limit, 
            where,
            select: {
                trip:{
                    select: {
                        id: true,
                        seats: true,
                        remainingSeats: true,
                        status: true,
                        departureDate: true,
                        departureTime: true
                    }
                }, 
                stops: true
            }
        })

        return { data }
    } 
}