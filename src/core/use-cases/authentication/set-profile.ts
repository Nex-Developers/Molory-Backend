import { ServerError, MissingParamError } from "../../../utils/errors"

export default function makeSetProfile({
    userDb,
    notifyDevice,
    publicationDb
}: any = {}) {
    if (!userDb || !publicationDb || !notifyDevice) throw new ServerError()
    return async function setProfile({
        id,
        lang,
        firstName,
        lastName,
        gender,
        email,
        birthDay
    }: any = {}) {
        console.log('birthDay', birthDay);
        if (!id) throw new MissingParamError('token')
        if (!firstName) throw new MissingParamError('firstName')
        if (!lastName) throw new MissingParamError('lastName')
        if (!gender) throw new MissingParamError('gender')
        // if (!email) throw new MissingParamError('email')
        if (!birthDay) throw new MissingParamError('birthDay')
        // if (typeof birthDay == 'string') birthDay = new Date(birthDay)
        const formatedDateArray = birthDay.split('-')
        const fomatedDate = [formatedDateArray[1], formatedDateArray[0], formatedDateArray[2]].join('-')
        birthDay = new Date(fomatedDate)
        let user = await userDb.findFirst({ where: { id }, select: { id: true, firstName: true, lastName: true, birthDay: true, profileCompletedAt: true, devices: true } })
        if (user && (user.firstName || user.lastName || user.birthDay)) {
            const message = { text: 'error.alreadyDone', params: { date: user.profileCompletedAt } }
            return { message }
        }
        const res: any = { firstName, lastName, gender, birthDay, email, profileCompletedAt: new Date(), language: lang }
        const deviceTokens = user.devices.map(device => device.token)
        const { title, body, data, cover } = await notifyDevice({ deviceTokens, titleRef: 'notification.signUpTitle', messageRef: 'notification.signUpMessage', cover: null, data: null, lang: 'fr' })
        await publicationDb.insertOne({
            data: {
                title,
                message: body,
                data: data ? JSON.stringify(data) : null,
                picture: cover,
                notifications: {
                    create: {
                       user: {
                            connect: { id: user.id}
                       }
                    }
                }
            }
        })
        user = await userDb.updateOne({ where: { id }, data: res })
        const message = { text: 'auth.message.profileUpdated' }
        return { message, user }
    }
}