import { MissingParamError } from "../../../utils/errors"
import { DbConnection } from "../../../utils/helpers"

export default function makeReport({
    // notifyUser,
    // saveTravel,
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
            await prisma.trip.update({ where: { id: tripId}, data: { status: -1, canceledAt: new Date()  }})
            // notifyUser({ id: travel.userId, titleRef: { text: 'notification.removeTrip.title'}, messageRef: { text: 'notification.removeTrip.message'}, cover: null,  data: { path: 'cancel-trip', id: id.toString(), res:'INFOS'}, lang: 'fr', type: 'trip' })
        }
        saveTrip(tripId)
        const message = { text: "response.add" }
        return { message }
    } 
}
