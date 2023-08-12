import { AlreadyDoneError, MissingParamError, ServerError, UnauthorizedError } from "../../../utils/errors"
import {  DbConnection } from "../../../utils/helpers"
import { v4 } from 'uuid'

export default function makeRemove({
    travelDb,
    notifyUser,
    saveTrip,
    saveTravel,
    saveProfile
}: any = {}) {
    if (!travelDb || !saveTravel || !saveTrip ||  !notifyUser || !saveProfile) throw new ServerError()
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
                user,
                route, 
                seats, 
                status, 
                canceledAt 
            } = await prisma.travel.findUnique(
                { where: { id }, 
                select: { 
                    userId: true, 
                    status: true, 
                    user: { select: {
                        lastName: true,
                        firstName: true
                    }
                        
                    },
                    route: { select: {
                        id: true,
                        principal: true,
                        departureDate: true,
                        departureTime: true,
                        departureAddress: true,
                        arrivalAddress: true,
                        trip: { select: { id: true, userId: true } }
                    }},
                    seats: true,
                    transactions: true,
                    canceledAt: true 
                }})
            if (status === 0) throw new AlreadyDoneError(canceledAt.toString())
            if(status < 4 ) throw new UnauthorizedError()
            // annulation  
            await prisma.travel.update({ where: { id }, data: { status: 0, cancelReason, canceledAt: new Date(), } })
            // reset seats
            await prisma.route.update({ where: { id: route.id }, data: { remainingSeats: { increment: seats } } })
            if (route.principal) await prisma.trip.update({ where: {id: route.trip.id}, data: { remainingSeats: { increment: seats } } })
            // penalities
            const payment  = await prisma.transaction.findFirst({ where: { travelId: id, status: 1}})
            const payedAmount = payment.amount
            let amount = payedAmount
            const departure = new Date(route.departureDate + ' ' + route.departureTime)
            const delay = getLast48hours(departure)
            if(new Date() < delay) {
                 amount = payedAmount - Math.ceil((payedAmount * 0.10) / 5) * 5
            }

            // return money
            const transactionId = v4()
            await prisma.transaction.create({ data: { id: transactionId, amount,  type: 'refund', ref: transactionId, walletId: userId ,  status: 1 } })
            await prisma.transaction.update({ where: {id: payment.id}, data: { status: 0 }})
            await prisma.wallet.update({ where: {id: userId}, data: { balance: { increment: amount}}})
            
            // Notify driver
            saveTravel(id)
            saveTrip(route.trip.id)
            saveProfile(userId)
            notifyUser({ id: userId, titleRef: { text: 'notification.cancelTravel.title'}, messageRef: { text: 'notification.cancelTravel.message', params: { departure: route.departureAddress, arrival: route.arrivalAddress, date: route.departureDate, time: route.departureTime }}, cover: null, data: { path: 'cancel-travel', id: id.toString(), res:'DANGER'}, lang: 'fr', type: 'travel' })
            notifyUser({ id: route.trip.userId, titleRef: { text: 'notification.removeTrip.title'}, messageRef: { text: 'notification.removeTrip.message', params: { name: user.firstName, departure: route.departureAddress, arrival: route.arrivalAddress, date: route.departureDate, time: route.departureTime }}, cover: null, data: { path: 'cancel-travel', id: id.toString(), res:'DANGER'}, lang: 'fr', type: 'travel' })
            const message = { text: 'response.remove' }
            return { message }
        })

    }
}