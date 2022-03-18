import { MissingParamError, ServerError } from "../../../utils/errors"

export default function makeListItemInfos({
    routeDb
}: any = {}) {
    if (!routeDb) throw new ServerError()
    return async ({
        tripId
    }: any = {}) => {
        if (!tripId) throw new MissingParamError('id')

        const routes = await routeDb.findFirst({ 
            where: {
                tripId: true
            }, 
            select: {
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