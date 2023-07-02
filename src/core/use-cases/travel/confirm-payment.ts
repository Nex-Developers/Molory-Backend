// import { AlreadyDoneError } from './../../../utils/errors/already-done-error';


import { ExpiredParamError, InvalidParamError, ServerError } from "../../../utils/errors"
import { CacheManager, DbConnection } from "../../../utils/helpers"



export default function makeConfirmPayment({
    saveProfile,
    saveTravel,
    saveTrip,
    notifyUser,
    addTask,
}) {
    if (!saveProfile || !saveTravel || !saveTrip || !notifyUser) throw new ServerError()

    const reformateDate = (date: string) => {
        return date.split("-").reverse().join("-")
    }

    const getDatePlusQuater = (date: Date) => {
        return new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes());
    }

    return async ({
        id,
        status,
        amount,
        method,
        reference,
        validatedAt
    }: any = {}) => {
        const prisma = DbConnection.prisma
        console.log('Confirm-payment called with ', id, status, amount,  reference)
        if (!status) {
            const message = { text: "response.delete" }
            return { message }
        }
        const saved = await CacheManager.get(id)
        if (!saved) throw new ExpiredParamError('payement id')
        const data = JSON.parse(saved)
        // if (data.amount != amount) {
        //     throw new InvalidParamError('amount')
        // }
        if (!method) method = null
        if (!validatedAt) validatedAt = new Date()
        if (!reference) reference = null
        return await prisma.$transaction(async () => {
            // check remaining seats
            const { remainingSeats, principal, trip, departureAddress, departureDate, departureTime, arrivalAddress } = await prisma.route.findUnique({
                where: { id: data.routeId },
                select: { remainingSeats: true, principal: true, trip: true, departureAddress: true, departureTime: true, departureDate: true, arrivalAddress: true }
            })
            if (!trip.remainingSeats) throw new InvalidParamError('Unvailable seats')
            if (data.seats > remainingSeats) throw new InvalidParamError('Missing ' + (data.seats - remainingSeats) + ' seats')
            // update travel status
            const payment: any = {
                create: {
                    id,
                    amount: data.amount,
                    reference,
                    validatedAt,
                    method,
                    status: 1,
                    user: { connect: { id: data.userId } },
                    trip: { connect: { id: trip.id } },
                }
            }
            if (data.promotionId) payment.create.promotion = { connect: { id: data.promotionId } }

            const travel = await prisma.travel.create({
                data: {
                    seats: data.seats,
                    description: data.description,
                    departureAddress,
                    arrivalAddress,
                    departureDate,
                    departureTime,
                    payment,
                    route: {
                        connect: { id: data.routeId }
                    },
                    user: {
                        connect: { id: data.userId }
                    }
                },
                include: { route: true, user: true }
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
            saveTravel(travel.id)
            saveTrip(trip.id)
            notifyUser({ id: travel.userId, titleRef: { text: 'notification.addTravel.title' }, messageRef: { text: 'notification.addTravel.message', params: { seats: data.seats, departure: departureAddress, arrival: arrivalAddress, date: departureDate, time: departureTime } }, cover: null, data: { path: 'add-travel', id: id.toString(), res: 'SUCCESS' }, lang: 'fr', type: 'travel' })
            notifyUser({ id: trip.userId, titleRef: { text: 'notification.bookTrip.title' }, messageRef: { text: 'notification.bookTrip.message', params: { name: travel.user.firstName, seats: data.seats, departure: departureAddress, arrival: arrivalAddress, date: departureDate, time: departureTime } }, cover: null, data: { path: 'add-travel', id: id.toString(), res: 'INFOS' }, lang: 'fr', type: 'travel' })
            const formatedDate = reformateDate(travel.route.departureDate)
            const date = new Date(formatedDate + ' ' + travel.route.departureTime)
            const timer = getDatePlusQuater(date)
            await addTask({ path: 'ask-to-start-travel', timer, params: { id: travel.id } })
            delete data.user
            const message = { text: "response.add", data: travel }
            return { message, id: travel.id }
        })

    }
}