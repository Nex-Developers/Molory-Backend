import { MissingParamError } from "../../../utils/errors"
import { DbConnection } from "../../../utils/helpers"

export default function makeReport({
    notifyUser,
    saveTravel,
    saveTrip
}) {
    const prisma = DbConnection.prisma

    return async ({
        tripId,
        description,
        interrupted 
    }: any = {}) => {
        if (!tripId) throw new MissingParamError('tripId')
        if (!description) throw new MissingParamError('description')
        
        await prisma.tripReport.create({ data: { description, interrupted, trip: { connect: { id: tripId}}  }})
        if (interrupted) {
            const { routes, userId } = await prisma.trip.findUnique({ where: { id: tripId  }, select: { userId: true, routes: { select: { travels: true } },   } })
            await prisma.trip.update({ where: { id: tripId}, data: { status: -1, canceledAt: new Date()  }})
            const promises = routes.map(async (route) => {
                const travelsIds = route.travels.map(travel => travel.id)
                await prisma.travel.updateMany({
                    where: { id: { in: travelsIds } },
                    data: {
                        status: -1,
                        canceledAt: new Date(),
                        cancelReason: description,
                        canceledBy: 'driver',
                    },
                })
                const promises2 = await route.travels.map(async travel => {
                        // notify the user
                        notifyUser({ id: travel.userId, titleRef: { text: 'notification.removeTrip.title'}, messageRef: { text: 'notification.removeTrip.message'}, cover: null,  data: { path: 'cancel-trip', id: tripId.toString(), res:'INFOS'}, lang: 'fr', type: 'trip' })
                        saveTravel(travel.id)
                    return true
                });
                return Promise.all(promises2).then(() => true)
            })
            return Promise.all(promises).then(() => {
                saveTrip(tripId)
                notifyUser({ id: userId, titleRef: { text: 'notification.interruptTrip.title'}, messageRef: { text: 'notification.interruptTrip.message'}, cover: null,  data: { path: 'cancel-trip', id: tripId.toString(), res:'INFOS'}, lang: 'fr', type: 'trip' })
                return
            })
        }
        saveTrip(tripId)
        const message = { text: "response.add" }
        return { message }
    } 
}
