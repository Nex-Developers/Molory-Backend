import { ServerError, InvalidParamError, MissingParamError } from "../../../utils/errors"

export default function makeSetProfile ({
    userDb,
}: any = {}) {
    if (!userDb) throw new ServerError()
    return async function setProfile({
        id ,
        lang,
        firstName,
        lastName,
        gender,
        email,
        birthDay
    }: any = {}) {
        console.log('birthDay', birthDay);
        if (! id ) throw new InvalidParamError('token')
        if (!firstName) throw new MissingParamError('firstName')
        if (!lastName) throw new MissingParamError('lastName')
        if (!gender) throw new MissingParamError('gender')
        // if (!email) throw new MissingParamError('email')
        if (!birthDay) throw new MissingParamError('birthDay')
        if (typeof birthDay == 'string') birthDay = new Date(birthDay)
        let user = await userDb.findFirst({ where: { id }, select: { firstName: true, lastName: true, birthDay: true, profileCompletedAt: true }})
        if (user && (user.firstName || user.lastName || user.birthDay)) {
            const message =  { text: 'error.alreadyDone', params: { date: user.profileCompletedAt}}
            return { message }
        }
        const data: any = { firstName, lastName, gender, birthDay, email, profileCompletedAt: new Date(), language: lang }
        
        user = await userDb.updateOne({ where: { id }, data })
        const message = { text: 'auth.message.profileUpdated'}
        return { message, user }
    }
}