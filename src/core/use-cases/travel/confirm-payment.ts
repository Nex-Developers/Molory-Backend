// import { ServerError } from "../../../utils/errors"


// import { PrismaClient } from "@prisma/client"

export default function makeConfirmPayment({
    prisma,
    getPaymentState
}: any = {}) {
    // if (!prisma || !getPaymentState) throw new ServerError()
    return async ({
        id
    }: any = {}) => {
        // const prisma = DbConnection.prisma
        const { status, amount, travel } = await prisma.payment.findFirst({
            where: { id },
            select: {
                status: true, amount: true, travel: {
                    select: { id: true, routeId: true, seats: true }
                }
            }
        })
        if (status == 2) {
            const res = await getPaymentState({ id })
            console.log(res)
            // verify  « cpm_result » est égale à « 00 »

            await prisma.payment.update({
                where: { id }, data: {
                    reference: res.api_response_id,
                    receivedAmount: +res.data.amount,
                    method: res.data.payment_method,
                    accessNumber: res.data.operator_id,
                    status: res.code == "00" ? 1 : 0,
                    validatedAt: res.data.payment_date
                }
            })
            // ensure « cpm_amount » est égale à la valeur du montant stocké
            if (res.code !== "00") {
                // notify client
                return
            }

            if (amount !== + res.data.amount) {
                // send notification to admin and user
                return
            }
            prisma.$transaction(async _ => {
                // check remaining seats
                const { trip } = await prisma.route.findFirst({
                    where: { id: travel.routeId },
                    select: { trip: true }
                })
                if (!trip.remainingSeats) throw new Error('Unvailable Resource')
                if (travel.seats > trip.remainingSeats) throw new Error('Missing ' + (travel.seats - trip.remainingSeats) + 'resource')
                // update travel status
                prisma.travel.update({ where: { id: travel.id }, data: { status: 3 } })
                // remove seats from trip avalaibleSeats
                prisma.trip.update({ where: { id: trip.id }, data: { remainingSeats: { decrement: travel.seats } } })
            })

        }
        return
        // const message = { text: "response.add" }
        // return { message }
    }
}