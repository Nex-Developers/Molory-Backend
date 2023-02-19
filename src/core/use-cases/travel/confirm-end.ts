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

    const reformateDate = (date: string) => {
        return date.split("-").reverse().join("-")
    }

    const getCalculatedtDate = (date: Date, additionalMinutes: number) => {
        return new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes() + additionalMinutes);
    }

    return async ({
        id,
        response,
        reason
    }) => {
        console.log(' End travel', + id)
        if (!id) throw new MissingParamError('id')
        if (!response) response = false
        const prisma = DbConnection.prisma
        return await prisma.$transaction(async () => {
            const { userId, status, startedAt, departureAddress, arrivalAddress, departureDate, departureTime, route } = await prisma.travel.findUnique({ where: { id }, select: { userId: true, status: true, startedAt: true, departureAddress: true, arrivalAddress: true, departureDate: true, departureTime: true, route: true } })
            if (status !== 2) throw new AlreadyDoneError(startedAt?.toString())
            const formatedDate = reformateDate(route.departureDate)
            const date = new Date(formatedDate + ' ' + route.departureTime)
            if (response) {
                await prisma.travel.update({ where: { id }, data: { status: 1, startedAt: new Date() } })
                notifyUser({ id: userId, titleRef: { text: 'notification.confirmTravelEnded.title' }, messageRef: { text: 'notification.confirmTravelEnded.message', params: { departure: departureAddress, arrival: arrivalAddress, date: departureDate, time: departureTime } }, cover: null, data: { path: 'travel-ended', id: id.toString(), res:'SUCCCESS'}, lang: 'fr', type: 'travel' })
            } else {
                // updatewith reason
                await prisma.travel.update({ where: { id}, data: { notEndedReason: reason }})
                const timer = getCalculatedtDate(date, route.duration * 60 + 6 * 60)
                await addTask({ path: 'self-confirm-travel-ended', timer, params: { id } })
            }
            await saveTravel(id)
            saveTrip(route.tripId)
            const message = { text: "response.edit" }
            return { message }
        })
    }
}
