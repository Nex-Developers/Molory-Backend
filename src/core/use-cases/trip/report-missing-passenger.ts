import { ServerError, UnauthorizedError } from "../../../utils/errors"
import { DbConnection } from "../../../utils/helpers"

export default ({
    notifyDevice
}) => {
    if (!notifyDevice) throw new ServerError()
    return async ({
        id,
        travelId
    }) => {
        const prisma = DbConnection.prisma
        return await prisma.$transaction( async () => {
            const { status } = await prisma.trip.findUnique({ where: { id }, select: { status: true }})
            if (status > 2) throw new UnauthorizedError()
            await prisma.travel.update({ where:  { id: travelId }, data: { status: 4 }})
            // notify client that his trip shall start

            // add finish task
            
            const message = { text: "response.edit" }
            return { message }
        })
    }
}