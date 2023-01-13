// import { AlreadyDoneError } from './../../../utils/errors/already-done-error';


import { ExpiredParamError, InvalidParamError, ServerError } from "../../../utils/errors"
import { CacheManager, DbConnection } from "../../../utils/helpers"


    
export default function makeConfirmPayment({
    saveProfile
}) {
    if (!saveProfile) throw new ServerError()
    return async ({
        id,
        status,
        amount,
        method,
        reference,
        validatedAt,
    }: any = {}) => {
        const prisma = DbConnection.prisma
        console.log('Confirm-payment called with ', id, status, amount)
        if (!status) {
            const message = { text: "response.delete" }
            return { message }
        }
     
        const saved = await CacheManager.get(id)
        if(!saved) throw new ExpiredParamError('payement id')
        const data = JSON.parse(saved)
        if (data.amount != amount) {
            throw new InvalidParamError('amount')
        }
        if (!method) method = null
        if (!validatedAt) validatedAt = new Date()
        if (!reference) reference = null
        return await prisma.$transaction(async () => {
            // check remaining seats
            const { remainingSeats, principal, trip } = await prisma.route.findUnique({
                where: { id: data.routeId },
                select: { remainingSeats: true, principal: true, trip: true }
            })
            if (!trip.remainingSeats) throw new InvalidParamError('Unvailable seats')
            if (data.seats > remainingSeats) throw new InvalidParamError('Missing ' + (data.seats - remainingSeats) + ' seats')
            // update travel status
            const travel = await prisma.travel.create({
                data: {
                    seats: data.seats,
                    description: data.description,
                    payment: {
                        create: {
                            id,
                            userId: data.userId,
                            amount: data.amount,
                            reference,
                            validatedAt,
                            method,
                            status: 1
                        }
                    },
                    route: {
                        connect: { id: data.routeId }
                    },
                    user: {
                        connect: { id: data.userId}
                    }
                }
            })
            // remove seats from trip avalaibleSeats
            if (principal) {
                await prisma.route.update({ where: { id: data.routeId }, data: { remainingSeats: { decrement: data.seats, } } })
                await prisma.trip.update({ where: { id: trip.id }, data: { remainingSeats: { decrement: data.seats, } } })

            } else {
                await prisma.route.update({ where: { id: data.routeId }, data: { remainingSeats: { decrement: data.seats, } } })
                // const otherROutes
                const secondaryRoutes = await prisma.route.findMany({ where: { principal: false }, select: { remainingSeats: true } })
                if (secondaryRoutes.length) {
                    const A = secondaryRoutes[0].remainingSeats;
                    const B = secondaryRoutes[1].remainingSeats;
                    if (A !== B) {
                        prisma.route.updateMany({ where: { id: data.routeId, principal: true }, data: { remainingSeats: { decrement: data.seats, } } })
                        await prisma.trip.update({ where: { id: trip.id }, data: { remainingSeats: { decrement: data.seats, } } })
                    }
                }

            }
            await CacheManager.remove(id)
            saveProfile(travel.userId)
            const message = { text: "response.add", data: travel }
            return { message }
        })

    }
}