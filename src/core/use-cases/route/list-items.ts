import { MissingParamError, ServerError } from "../../../utils/errors"

export default function makeListItemInfos({
    routeDb
}: any = {}) {
    if (!routeDb) throw new ServerError()
    return async ({
        tripId,
        departure,
        arrival
    }: any = {}) => {
        if (!tripId) throw new MissingParamError('id')

        const where: any = {}
        if (tripId) where.tripId
        if (departure) {

        }

        if (arrival) {
            
        }

        const routes = await routeDb.findFirst({ 
            where,
            select: { 
                seats: true,
                status: true,
                createdAt: true,
                departure: true,
                arrival: true
            }
        })

        const data = []
        routes.forEach(route => {
            data.push(route.departure)
            data.push(route.arrival)
        })

        return { data }
    } 
}