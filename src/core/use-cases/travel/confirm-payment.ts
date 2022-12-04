import { AlreadyDoneError } from './../../../utils/errors/already-done-error';

// import { ServerError } from "../../../utils/errors"

import { InvalidParamError } from "../../../utils/errors"
import { DbConnection } from "../../../utils/helpers"


// import { PrismaClient } from "@prisma/client"

export default function makeConfirmPayment() {
    // if (!prisma || !getPaymentState) throw new ServerError()
    return async ({
        id,
        status,
        amount
    }: any = {}) => {
        const prisma = DbConnection.prisma
        console.log('Confirm-payment called with ', id, status, amount)
        if (!status) {
            const message = { text: "response.delete" }
            return { message }
        }
        const payment = await prisma.payment.findFirst({
            where: { id },
            select: {
                status: true, amount: true, travel: {
                    select: { id: true, routeId: true, seats: true }
                }
            }
        })
        if (payment.amount != amount) {
            throw new InvalidParamError('amount')
        }
        let travel = payment.travel;
        if (payment.status == 2) {
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
            return await prisma.$transaction(async () => {
                // check remaining seats
                const { remainingSeats, principal, trip } = await prisma.route.findFirst({
                    where: { id: travel.routeId },
                    select: { remainingSeats: true, principal: true, trip: true }
                })
                if (!trip.remainingSeats) throw new InvalidParamError('Unvailable Resource')
                if (travel.seats > remainingSeats) throw new InvalidParamError('Missing ' + (travel.seats - remainingSeats) + 'resource')
                // update travel status
                travel = await prisma.travel.update({ where: { id: travel.id }, data: { status: 3 } })
                // remove seats from trip avalaibleSeats
                if (principal) {
                    await prisma.route.updateMany({ where: { tripId: trip.id }, data: { remainingSeats: { decrement: travel.seats, } } })
                } else {
                    await prisma.route.update({ where: { id }, data: { remainingSeats: { decrement: travel.seats, } } })
                    // const otherROutes
                    const secondaryRoutes = await prisma.route.findMany({ where: { principal: false }, select: { remainingSeats: true } })
                    if (secondaryRoutes.length) {
                        const A = secondaryRoutes[0].remainingSeats;
                        const B = secondaryRoutes[1].remainingSeats;
                        if (A !== B) prisma.route.updateMany({ where: { principal: true }, data: { remainingSeats: { decrement: travel.seats, } } })
                    }
                    // for( let route of secondaryRoutes) route
                    // return
                  
                }
                const message = { text: "response.add", data: travel }
                return { message }
            })

        } else {
            throw new AlreadyDoneError(new Date().toISOString())
        }
        

    }
}