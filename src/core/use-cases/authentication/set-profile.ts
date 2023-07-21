import moment from "moment"
import { ServerError, MissingParamError } from "../../../utils/errors"
import { DbConnection } from "../../../utils/helpers"

export default function makeSetProfile({
    userDb,
    notifyUser,
    publicationDb,
    saveProfile
}: any = {}) {
    if (!userDb || !publicationDb || !notifyUser || !saveProfile) throw new ServerError()
    return async function setProfile({
        id,
        lang,
        firstName,
        lastName,
        gender,
        email,
        birthDay
    }: any = {}) {
        const prisma = DbConnection.prisma;
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
        const res: any = { id, firstName, lastName, gender, birthDay, email, profileCompletedAt: new Date(), language: lang }
        await prisma.wallet.create({data: { id }})

        user = await userDb.updateOne({ where: { id }, data: res })
        saveProfile(id)
        notifyUser({ id, titleRef: { text: 'notification.signUpTitle'}, messageRef: { text: 'notification.signUpMessage'}, cover: null, data: { path: 'complete-profile', id: id.toString(), res: 'SUCCESS' } , lang: 'fr', type:  'authentication' })
        user.birthDay =  moment(user.birthDay).format('DD-MM-YYYY')
        const message = { text: 'auth.message.profileUpdated' }
        return { message, user }
    }
}