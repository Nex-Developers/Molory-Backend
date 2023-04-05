import { MissingParamError, ServerError } from "../../../utils/errors"
import { v4 } from 'uuid'
import { CacheManager, DbConnection } from "../../../utils/helpers"
export default function makeAdd({
    travelDb,
    routeDb,
    paymentDb
}: any = {}) {
    if (!travelDb || !routeDb || !paymentDb) throw new ServerError()
    const generateUid = async () => {
        const uid = v4()
        const payment = await paymentDb.findFirst({ where: { id: uid } })
        if (payment) return await generateUid()
        if (await CacheManager.get(uid)) return await  generateUid()
        return uid
    }

    return async ({
        userId,
        routeId,
        seats,
        description,
        promotionId
    }: any = {}) => {
        const prisma = DbConnection.prisma
        if (!userId) throw new MissingParamError('userId')
        if (!routeId) throw new MissingParamError('routeId')
        if (!seats) throw new MissingParamError('seats')
        if (!description) description = null
        // avoid buying self ticket
        // const { driverId } = await routeDb({ where: { } })

        const { price, fees, remainingSeats } = await routeDb.findFirst({
            where: { id: routeId },
            select: { price: true, fees: true, remainingSeats: true }
        })


        if (!remainingSeats) throw new Error('Unvailable Resource')

        if (seats > remainingSeats) throw new Error('Remaining ' + remainingSeats + ' seats')
        let applyDiscount = 1
        if (promotionId) {
            const { discount } = await prisma.promotion.findUnique({ where: { id: promotionId}})
            applyDiscount = discount
        } 
        const id = await generateUid()
        console.log(id)
        const amount = (price + fees ) * seats * applyDiscount
        const createdAt = new Date()
        await CacheManager.set(id, JSON.stringify({ userId, routeId, seats, description, amount, createdAt, promotionId }))
        const message = { text: "response.add" }
        return { message, payment: { id, amount, createdAt }}
    }


}
