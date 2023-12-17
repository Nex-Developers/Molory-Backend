import { ServerError } from "../../../utils/errors"
import { DbConnection } from "../../../utils/helpers"

export default function makeNotifyUser({
    sendNotification,
    addInCollection,
    translate
}: any = {}) {
    if (!sendNotification || !addInCollection || !translate) throw new ServerError()
    return async function notifyUser({
        id,
        titleRef,
        messageRef,
        cover,
        data,
        lang,
        type,
        title,
        message
    }: any = {}) {
        // if (!titleRef || !messageRef) throw new ServerError()
        if (!title) title = translate(lang, titleRef.text, titleRef.params)
        const body = message?message:translate(lang, messageRef.text, messageRef.params)
        // data = JSON.stringify(data)
        try {
            const prisma = DbConnection.prisma
            const devices = await prisma.device.findMany({ where: { userId: id }, select: { token: true }})
            const deviceTokens = devices.map(device => device.token).filter(token => token)
            if (data.id) data.id = data.id.toString()
            if (deviceTokens.length) sendNotification(deviceTokens, title, body, data, cover)
            addInCollection('users', id.toString(),'notifications', { type, title, message: body, data, picture:cover})
            // prisma.publication.create({
            //     data: {
            //         title,
            //         message: body,
            //         data: data ? JSON.stringify(data) : null,
            //         picture: cover,
            //         notifications: {
            //             create: {
            //                 user: {
            //                     connect: { id }
            //                 }
            //             }
            //         }
            //     }
            // })
            return
        } catch (err) {
            console.log(err.message)
        }
    }
}
