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
            const { status, startedAt } = await prisma.trip.findUnique({ where: { id }, select: { status: true, startedAt: true }})
            if (status === 0) throw new UnauthorizedError()
            if (status === 1) throw new AlreadyDoneError(startedAt.toString())
            await prisma.trip.update({ where: { id }, data: { status: 1, startedAt: new Date() }})
            await prisma.travel.updateMany({ where: { route: { tripId: id }, status: { gt: 1 }}, data: { status: 1 }})
            // notify driver that his trip shall start

            // xxxxx notify passengers that the driver start
            const message = 'response.edit'
            return { message}
        })
    }
}