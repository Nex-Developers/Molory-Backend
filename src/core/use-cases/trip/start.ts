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

    const getNextDay = (date: Date) => {
        // return new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1, date.getHours(), date.getMinutes());
        return new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes());

    }
    
    return async ({
        id
    }) => {
        console.log(' Start trip', + id)
        const prisma = DbConnection.prisma
        return await prisma.$transaction( async () => {
            const {  userId, departureDate, departureTime, departureAddress, arrivalAddress, status, startedAt } = await prisma.trip.findUnique({ where: { id }, select: { userId: true, status: true, startedAt: true, departureDate: true, departureTime: true, departureAddress: true, arrivalAddress: true }})
            if (status !== 3) throw new AlreadyDoneError(startedAt?.toString())
           // if (status === 2) throw new AlreadyDoneError(startedAt.toString())
            await prisma.trip.update({ where: { id }, data: { status: 2, startedAt: new Date() }})
            // await prisma.travel.updateMany({ where: { route: { tripId: id }, status: { gt: 4 }}, data: { status:  4}})
            // notify driver that his trip shall start
            notifyUser({ id: userId, titleRef: { text: 'notification.startTrip.title'}, messageRef: { text: 'notification.startTrip.message', params: { departure: departureAddress, arrival: arrivalAddress, date: departureDate, time: departureTime}}, cover: null,  data: { path: 'start-trip', id: id.toString(), res:'INFOS'}, lang: 'fr', type: 'trip' })
          // add finish task
           const formatedDate = reformateDate(departureDate) 
           const date = new Date(formatedDate + ' ' + departureTime)
            const timer = getNextDay(date)
            await addTask({ path: 'trip-finish', timer, params: { id }})
            saveTrip(id)
            const message = { text: "response.edit" }
            return { message }
        })
    }
}
