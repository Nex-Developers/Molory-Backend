import { InvalidParamError, MissingParamError, ServerError } from "../../../utils/errors"
import { v4 } from 'uuid'
import { CacheManager, DbConnection } from "../../../utils/helpers"
export default function makeAdd({
    travelDb,
    routeDb,
    saveTransaction,
    confirmPayment,
    updateTransaction
}: any = {}) {
    if (!travelDb || !routeDb || !saveTransaction ||!confirmPayment) throw new ServerError()
    const generateUid = async () => {
        const uid = v4()
        const payment = await DbConnection.prisma.transaction.findUnique({ where: { id: uid } })
        if (payment) return await generateUid()
        if (await CacheManager.get(uid)) return await generateUid()
        return uid
    }

    return async ({
        userId,
        routeId,
        seats,
        description,
        promotionId,
        method
    }: any = {}) => {
        const prisma = DbConnection.prisma
        if (!userId) throw new MissingParamError('userId')
        if (!routeId) throw new MissingParamError('routeId')
        if (!seats) throw new MissingParamError('seats')
        if (!description) description = null
        if (!method) method === 'wallet'
        // avoid buying self ticket
        // const { driverId } = await routeDb({ where: { } })

        const { price, fees, commission, remainingSeats } = await routeDb.findFirst({
            where: { id: routeId },
            select: { price: true, fees: true, commission: true, remainingSeats: true }
        })


        if (!remainingSeats) throw new Error('Unvailable Resource')

        if (seats > remainingSeats) throw new Error('Remaining ' + remainingSeats + ' seats')
        let applyDiscount = 1
        if (promotionId) {
            const { discount, isForDriver } = await prisma.promotion.findUnique({ where: { id: promotionId } })
            if (isForDriver) throw new InvalidParamError(promotionId)
            applyDiscount = 1 - discount;
        }
        const id = await generateUid()
        console.log(id)
        const amount = Math.ceil(((price + fees + commission) * seats * applyDiscount)/5) * 5
        const createdAt = new Date()
        const { firstName, lastName, email, phoneNumber } = await prisma.user.findUnique({ where: { id: userId } })
        const res = await saveTransaction({ id, amount, firstName, lastName, email, phoneNumber, type: 'payment', method, params: { userId, bookingStatus: 2 } })
        await CacheManager.set(res.id, JSON.stringify({ userId, routeId, seats, description, amount, createdAt, promotionId }))
        if (method === 'wallet') {
            updateTransaction({id, status: 1 })
            await confirmPayment({ id, status: 1, amount, method, reference: res.transactionId, validatedAt: new  Date()})
        }
        const message = { text: "response.add" }
        return { message, payment: { id, amount, createdAt, ...res } }
    }

}
