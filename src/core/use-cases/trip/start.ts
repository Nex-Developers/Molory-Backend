import { AlreadyDoneError, ServerError } from "../../../utils/errors"
import { DbConnection } from "../../../utils/helpers"

export default ({
    notifyUser,
    addTask
}) => {
    if (!notifyUser || !addTask) throw new ServerError()

    const getNextDay = (date: Date) => {
        return new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1, date.getHours(), date.getMinutes());
    }
    
    return async ({
        id
    }) => {
        console.log(' Start trip', + id)
        const prisma = DbConnection.prisma
        return await prisma.$transaction( async () => {
            const {  userId, departureDate, departureTime, status, startedAt, routes } = await prisma.trip.findUnique({ where: { id }, select: { userId: true, status: true, startedAt: true, departureDate: true, departureTime: true, routes: { select: { id: true}}}})
            if (status !== 3) throw new AlreadyDoneError(startedAt?.toString())
           // if (status === 2) throw new AlreadyDoneError(startedAt.toString())
            await prisma.trip.update({ where: { id }, data: { status: 2, startedAt: new Date() }})
            await prisma.travel.updateMany({ where: { route: { tripId: id }, status: { gt: 1 }}, data: { status: 2 }})
            // notify driver that his trip shall start
            notifyUser({ id: userId, titleRef: { text: 'notification.startTrip.title'}, messageRef: { text: 'notification.startTrip.message'}, cover: null, data: { type: 'trip', id}, lang: 'fr' })
           const routesIds = routes.map( route => route.id)
           const travels = await prisma.travel.findMany({ where: { routeId: { in: routesIds }, status: 2}, select: {id: true, userId: true}})
           travels.forEach(({id,  userId}) =>  notifyUser({ id: userId, titleRef: { text: 'notification.startTravel.title'}, messageRef: { text: 'notification.startTravel.message'}, cover: null, data: { type: 'travel', id}, lang: 'fr' }))            // add finish task
            const date = new Date(departureDate + ' ' + departureTime)
            const timer = getNextDay(date)
            await addTask({ path: 'trip-finish', timer, params: { id }})
            const message = { text: "response.edit" }
            return { message }
        })
    }
}
