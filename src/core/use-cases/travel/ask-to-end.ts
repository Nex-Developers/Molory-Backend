import { MissingParamError } from '../../../utils/errors/missing-param-error';
import { AlreadyDoneError, ServerError } from "../../../utils/errors"
import { DbConnection } from "../../../utils/helpers"

export default ({
    notifyUser,
    addTask,
    saveTravel
}) => {

    if (!notifyUser || !addTask || !saveTravel) throw new ServerError()

    const reformateDate = (date: string) => {
        return date.split("-").reverse().join("-")
    }

    const getCalculatedtDate = (date: Date, additionalMinutes: number) => {
        return new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes() + additionalMinutes);
    }

    return async ({
        id
    }) => {
        console.log(' Ask End travel', + id)
        if(!id) throw new MissingParamError('id')
        const prisma = DbConnection.prisma
        return await prisma.$transaction( async () => {
            const {  userId, status, route  } = await prisma.travel.findUnique({ where: { id }, select: { userId: true, status: true, route: true}})
            if (status !== 3) throw new AlreadyDoneError('unkown date')
            await prisma.travel.update({ where: { id}, data: { status: 2 }})
             notifyUser({ id: userId, titleRef: { text: 'notification.AskStopTravel.title'}, messageRef: { text: 'notification.AskStopTravel.message'}, cover: null, data: { path: 'end-travel', id: id.toString(), res:'INFOS'}, lang: 'fr', type: 'travel' })
            await saveTravel(id)
            const formatedDate = reformateDate(route.departureDate)
            const date = new Date(formatedDate + ' ' + route.departureTime)
            const timer = getCalculatedtDate(date, route.duration * 60 + 6 * 60)
            await addTask({ path: 'self-confirm-travel-ended', timer, params: { id, response: true, confirmedBy: 'molory' } })
            const message = { text: "response.edit" }
            return { message }
        })
    }
}
