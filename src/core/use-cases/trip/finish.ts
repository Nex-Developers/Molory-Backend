import { AlreadyDoneError, ServerError, UnauthorizedError } from "../../../utils/errors"
import { DbConnection } from "../../../utils/helpers"

export default ({
    notifyDevice
}) => {
    if (!notifyDevice) throw new ServerError()
    return async ({
        id
    }) => {
        const prisma = DbConnection.prisma
        return await prisma.$transaction( async () => {
            const {  userId, status, startedAt } = await prisma.trip.findUnique({ where: { id }, select: { userId: true, status: true, startedAt: true }})
            if (status === 0) throw new UnauthorizedError()
            if (status === 1) throw new AlreadyDoneError(startedAt.toString())
            await prisma.trip.update({ where: { id }, data: { status: 1, finishedAt: new Date() }})
            // const travelsId = await prisma.travel.updateMany({ where: { route: { tripId: id }, status: { gt: 1 }}, data: { status: 1 }})
            const payments = await prisma.payment.findMany({ where: {  tripId: id , status: 1  }, select: { amount: true }})
            const total = payments.reduce((total, payment) => total + payment.amount, 0)
            await prisma.wallet.update({ where: { id: userId }, data: { balance: { increment: total }}})
            // notify driver that his trip is finished and his money is provided
           
            // xxxxx notify passengers the trip is finished and they are allowed to rate the driver

            const message = { text: "response.edit" }
            return { message }
        })
    }
}