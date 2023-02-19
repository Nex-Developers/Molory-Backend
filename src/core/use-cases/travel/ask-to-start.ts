import { MissingParamError } from '../../../utils/errors/missing-param-error';
import { AlreadyDoneError, ServerError } from "../../../utils/errors"
import { DbConnection } from "../../../utils/helpers"

export default ({
    notifyUser,
    saveTravel
}) => {
    if (!notifyUser || !saveTravel) throw new ServerError()
    return async ({
        id
    }) => {
        console.log('Ask Start travel', + id)
        if(!id) throw new MissingParamError('id')
        const prisma = DbConnection.prisma
        return await prisma.$transaction( async () => {
            const {  userId, status, departureAddress, arrivalAddress, departureDate, departureTime  } = await prisma.travel.findUnique({ where: { id }, select: { userId: true, status: true, departureAddress: true, arrivalAddress: true, departureDate: true, departureTime: true}})
            if (status < 4 ) throw new AlreadyDoneError('unkown date')
            await prisma.travel.update({ where: { id}, data: { status: 4 }})
             notifyUser({ id: userId, titleRef: { text: 'notification.AskStartTravel.title'}, messageRef: { text: 'notification.AskStartTravel.message', params: { departure: departureAddress, arrival: arrivalAddress, date: departureDate, time: departureTime }}, cover: null, data: { path: 'start-travel', id: id.toString(), res:'INFOS'}, lang: 'fr', type: 'travel' })
            await saveTravel(id)
            const message = { text: "response.edit" }
            return { message }
        })
    }
}
