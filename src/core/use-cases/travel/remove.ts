import { AlreadyDoneError, MissingParamError, ServerError, UnauthorizedError } from "../../../utils/errors"
import {  DbConnection } from "../../../utils/helpers"

export default function makeRemove({
    travelDb,
    notifyUser
}: any = {}) {
    if (!travelDb || !notifyUser) throw new ServerError()
    const getLast48hours = (date) => {

        return new Date(date.getFullYear(), date.getMonth(), date.getDate() - 2);
    }
    return async ({
        id,
        cancelReason
    }: any = {}) => {
        const prisma = DbConnection.prisma
        if (!id) throw new MissingParamError('id')
        if (!cancelReason) throw new MissingParamError('cancelReason')
        return await prisma.$transaction(async () => {
            const { 
                userId, 
                route, 
                seats, 
                payment, 
                status, 
                canceledAt 
            } = await prisma.travel.findUnique(
                { where: { id }, 
                select: { 
                    userId: true, 
                    status: true, 
                    route: { select: {
                        id: true,
                        principal: true,
                        departureDate: true,
                        departureTime: true,
                        trip: { select: { id: true, userId: true } }
                    }},
                    seats: true,
                    payment: true,
                    canceledAt: true 
                }})
            if (status === 0) throw new AlreadyDoneError(canceledAt.toString())
            if(status !== 3) throw new UnauthorizedError()
            // annulation  
            await prisma.travel.update({ where: { id }, data: { status: 0, cancelReason, canceledAt: new Date(), } })
            // reset seats
            await prisma.route.update({ where: { id: route.id }, data: { remainingSeats: { increment: seats } } })
            if (route.principal) await prisma.trip.update({ where: {id: route.trip.id}, data: { remainingSeats: { increment: seats } } })
            // penalities 
            const payedAmount = payment.amount
            let amount = payedAmount
            const departure = new Date(route.departureDate + ' ' + route.departureTime)
            const delay = getLast48hours(departure)
            if(new Date < delay) {
                amount = payedAmount * 0.15
                await prisma.wallet.update({ where: {id: route.trip.userId}, data: { balance: { increment: payedAmount - amount}}})
            }
            // return money
            await prisma.refund.create({ data: { id: payment.id, amount, user: { connect: { id: userId }}, travel: { connect: { id }} } })
            await prisma.payment.update({ where: {id: payment.id}, data: { status: 0 }})
            
            // Notify driver
            notifyUser({ id: route.trip.userId, titleRef: { text: 'notification.removeTravel.title'}, messageRef: { text: 'notification.removeTravel.message'}, cover: null, data: { type: 'travel', id}, lang: 'fr' })
            const message = { text: 'response.remove' }
            return { message }
        })

    }
}