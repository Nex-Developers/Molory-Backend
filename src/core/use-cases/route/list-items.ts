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
        if(date) where.departureDate = date
        // if (departure && arrival) where.stops = { AND: [{ address: departure, type: 'departure' }, { address: arrival, type: 'arrival' }]}
        // else if (departure) where.stops = {address: departure, type: 'departure'}
        // else if (arrival) where.stops = {address: arrival, type: 'arrival'}
        

        const routes = await routeDb.findMany({
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
                // trip:{
                //     select: {
                //         id: true,
                //         seats: true,
                //         remainingSeats: true,
                //         status: true,
                //         departureDate: true,
                //         departureTime: true,
                //         user: {
                //             select: {
                //                 id: true,
                //                 avatar: true,
                //                 firstName: true,
                //                 lastName: true,
                //                 phoneNumber: true
                //             }
                //         }
                //     }
                // }, 
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
        })

        const data = routes.filter(route => 
            route.stops.find( stop => stop.address.toLowerCase().includes(departure.toLowerCase()) && stop.type == 'departure')
            && route.stops.find(stop => stop.address.toLowerCase().includes(arrival.toLowerCase()) && stop.type == 'arrival') 
        )
        .map(route => {
            route.price = route.price + route.fees
            delete route.fees
            return route
        })

        return { data }
    } 
}