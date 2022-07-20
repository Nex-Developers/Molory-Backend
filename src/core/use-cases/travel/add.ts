import { MissingParamError, ServerError } from "../../../utils/errors"

export default function makeAdd({
    travelDb,
    routeDb,
    operationDb
}: any = {}) {
    if (!travelDb) throw new ServerError()
    return async ({
        userId,
        routeId,
        seats
    }: any = {}) => {
        
        if (!userId) throw new MissingParamError('userId')
        if (!routeId) throw new MissingParamError('routeId')
        if (!seats) throw new MissingParamError('seats')

        const { price, trip } = await routeDb.findFirst({ 
            where: { id: routeId }, 
            select: {price: true, trip: { remaningSeats: true}}
        })
        

        if (!trip.remaningSeats) throw new Error('Unvailable Resource')

        if (seats > trip.remaningSeats) throw new Error('Missing ' + (seats - trip.remaningSeats) + 'resource')

        const { id } = await travelDb.insertOne({ data: { userId, routeId, seats }})

        const operation = await operationDb.insertOne({ data: { travelId: id, userId, type: 'payment', amount: price }})
        const message = {text: "response.add" }
        return { message, id , operation }
    } 
}