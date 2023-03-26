import { MissingParamError } from "../../../utils/errors"
import { DbConnection } from "../../../utils/helpers"

export default function makeReport({
    saveTravel,
    saveTrip,
    notifyUser
}) {

    return async ({
        travelId,
        description,
        userId,
        interrupted 
    }: any = {}) => {
        const prisma = DbConnection.prisma
        if (!travelId) throw new MissingParamError('travelId')
        if (!description) throw new MissingParamError('description')
        
        await prisma.travelReport.create({  data: {  description, interrupted, user: { connect: { id: userId }}, travel: { connect: { id: travelId}}  }})
        const { route, user } = await prisma.travel.findUnique({ where: { id: travelId }, select: { user: true, route: { select: { departureAddress: true, arrivalAddress: true, departureDate: true, departureTime: true, trip: true}} } })
        if (interrupted) {
            await prisma.travel.update({ where: {id: travelId}, data: { status: -1, canceledAt: new Date() }  })
            if (user.id == userId) {
                notifyUser({ id: userId, titleRef: { text: 'notification.cancelTravel.title'}, messageRef: { text: 'notification.cancelTravel.message', params: { departure: route.departureAddress, arrival: route.arrivalAddress, date: route.departureDate, time: route.departureTime }}, cover: null, data: { path: 'cancel-travel', id: travelId.toString(), res:'DANGER'}, lang: 'fr', type: 'travel' })
                notifyUser({ id: route.trip.userId, titleRef: { text: 'notification.removeTrip.title'}, messageRef: { text: 'notification.removeTrip.message', params: { name: user.firstName, departure: route.departureAddress, arrival: route.arrivalAddress, date: route.departureDate, time: route.departureTime }}, cover: null, data: { path: 'cancel-travel', id: travelId.toString(), res:'DANGER'}, lang: 'fr', type: 'travel' })
            } else {
                notifyUser({ id: user.id, titleRef: { text: 'notification.removeTrip.title'}, messageRef: { text: 'notification.removeTrip.message'}, cover: null,  data: { path: 'cancel-trip', id: travelId.toString(), res:'INFOS'}, lang: 'fr', type: 'trip' })
            }
        }
        saveTravel(travelId)
        saveTrip(route.trip.id)
        const message = { text: "response.add" }
        return { message }
    } 
}
