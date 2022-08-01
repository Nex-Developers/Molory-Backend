import { MissingParamError, ServerError } from "../../../utils/errors"

export default function makeAdd({
    travelDb,
    routeDb,
    paymentDb
}: any = {}) {
    if (!travelDb || !routeDb || !paymentDb) throw new ServerError()
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
            select: { price: true, trip: { select: { remainingSeats: true } } }
        })


        if (!trip.remainingSeats) throw new Error('Unvailable Resource')

        if (seats > trip.remainingSeats) throw new Error('Missing ' + (seats - trip.remainingSeats) + 'resource')

        const { id, payment } = await travelDb.insertOne({
            data: {
                userId,
                routeId,
                seats,
                payment: {
                    create: {
                        userId,
                        amount: price * seats
                    }
                }
            },
            include: {
                payment: true
            }
        })

        const message = { text: "response.add" }
        return { message, id, payment }
    }
}
