import { MissingParamError } from '../../../utils/errors/missing-param-error';
import { AlreadyDoneError, ServerError } from "../../../utils/errors"
import { DbConnection } from "../../../utils/helpers"

export default ({
    notifyUser,
    addTask,
    saveTrip,
    saveTravel
}) => {
    if (!notifyUser || !addTask || !saveTrip || !saveTravel) throw new ServerError()

    return async ({
        id
    }) => {
        console.log(' End travel', + id)
        if (!id) throw new MissingParamError('id')
        const prisma = DbConnection.prisma
        return await prisma.$transaction(async () => {
            const { userId, status, startedAt, route } = await prisma.travel.findUnique({ where: { id }, select: { route: true, userId: true, status: true, startedAt: true } })
            if (status !== 2) throw new AlreadyDoneError(startedAt?.toString())
            await prisma.travel.update({ where: { id }, data: { status: 1, startedAt: new Date() } })
            notifyUser({ id: userId, titleRef: { text: 'notification.selfConfirmTravelEnded.title' }, messageRef: { text: 'notification.selfConfirmTravelEnded.message' }, cover: null, data: { path: 'end-travel', id: id.toString(), res:'WARNING'}, lang: 'fr', type: 'travel' })
            await saveTravel(id)
            saveTrip(route.tripId)
            const message = { text: "response.edit" }
            return { message }
        })
    }
}
