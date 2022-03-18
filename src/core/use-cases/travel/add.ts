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

        const { price, trip, travels } = await routeDb.findFirst({ 
            where: { id: routeId }, 
            select: {price: true, trip: { seats: true}, travels: { seats: true}}
        })
        
        const availableSeats = trip.seats - travels.reduce((a,b) =>a + b.seats , 0)

        if (!availableSeats) throw new Error('Unvailable Resource')

        if (seats < availableSeats) throw new Error('Missing ' + (seats - availableSeats) + 'resource')

        const { id } = await travelDb.insertOne({ data: { userId, routeId, seats }})

        const operation = await operationDb.insertOne({ data: { travelId: id, userId, type: 'payment', amount: price }})
        const message = "response.add"
        return { message, id , operation }
    } 
}