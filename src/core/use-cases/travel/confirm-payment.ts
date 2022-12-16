// import { AlreadyDoneError } from './../../../utils/errors/already-done-error';

// import { ServerError } from "../../../utils/errors"

import { ExpiredParamError, InvalidParamError } from "../../../utils/errors"
import { CacheManager, DbConnection } from "../../../utils/helpers"


// import { PrismaClient } from "@prisma/client"
    
export default function makeConfirmPayment() {
    // if (!prisma || !getPaymentState) throw new ServerError()
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
        // const payment = await prisma.payment.findFirst({
        //     where: { id },
        //     select: {
        //         status: true, amount: true, travel: {
        //             select: { id: true, routeId: true, seats: true }
        //         }
        //     }
        // })
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
                // for( let route of secondaryRoutes) route
                // return

            }
            await CacheManager.remove(id)
            const message = { text: "response.add", data: travel }
            return { message }
        })
        // let travel = payment.travel;
        // const res = await getPaymentState({ id })
        // console.log(res)
        // verify  « cpm_result » est égale à « 00 »

        // await prisma.payment.update({
        //     where: { id }, data: {
        //         reference: res.api_response_id,
        //         receivedAmount: +res.data.amount,
        //         method: res.data.payment_method,
        //         accessNumber: res.data.operator_id,
        //         status: res.code == "00" ? 1 : 0,
        //         validatedAt: res.data.payment_date
        //     }
        // })
        // ensure « cpm_amount » est égale à la valeur du montant stocké
        // if (res.code !== "00") {
        //     // notify client
        //     throw new UnauthorizedError()
        // }

        // if (amount !== + res.data.amount) {
        //     // send notification to admin and user
        //     throw new InvalidParamError('amount')
        // }
        // return await prisma.$transaction(async () => {
        //     // check remaining seats
        //     const { remainingSeats, principal, trip } = await prisma.route.findFirst({
        //         where: { id: travel.routeId },
        //         select: { remainingSeats: true, principal: true, trip: true }
        //     })
        //     if (!trip.remainingSeats) throw new InvalidParamError('Unvailable seats')
        //     if (travel.seats > remainingSeats) throw new InvalidParamError('Missing ' + (travel.seats - remainingSeats) + ' seats')
        //     // update travel status
        //     travel = await prisma.travel.update({ where: { id: travel.id }, data: { status: 3 } })
        //     // remove seats from trip avalaibleSeats
        //     if (principal) {
        //         await prisma.route.updateMany({ where: { tripId: trip.id }, data: { remainingSeats: { decrement: travel.seats, } } })
        //     } else {
        //         await prisma.route.update({ where: { id: travel.routeId }, data: { remainingSeats: { decrement: travel.seats, } } })
        //         // const otherROutes
        //         const secondaryRoutes = await prisma.route.findMany({ where: { principal: false }, select: { remainingSeats: true } })
        //         if (secondaryRoutes.length) {
        //             const A = secondaryRoutes[0].remainingSeats;
        //             const B = secondaryRoutes[1].remainingSeats;
        //             if (A !== B) prisma.route.updateMany({ where: { tripId: trip.id, principal: true }, data: { remainingSeats: { decrement: travel.seats, } } })
        //         }
        //         // for( let route of secondaryRoutes) route
        //         // return

        //     }
        //     await prisma.payment.update({ where: { id }, data: { status: 1, method, validatedAt}})
        //     const message = { text: "response.add", data: travel }
        //     return { message }
        // })

    }
}