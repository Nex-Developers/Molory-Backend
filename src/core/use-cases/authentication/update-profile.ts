import { ServerError, InvalidParamError, AccountAllReadyExistError } from "../../../utils/errors"
import { isValidEmail } from "../../services/email"

export default function makeUpdateProfile ({
    userDb
}: any = {}) {
    if (!userDb) throw new ServerError()
    return async function updateProfile({
        id ,
        firstName,
        lastName,
        birthDay,
        gender,
        email
    }: any = {}) {
        console.log('birthDay', birthDay)
        const data: any = {}
        if (! id ) throw new InvalidParamError('token')
        if (firstName) data.firstName = firstName
        if (lastName) data.lastName = lastName
        if (birthDay) {
            const formatedDateArray = birthDay .split('-')
            const fomatedDate = [ formatedDateArray[1], formatedDateArray[0], formatedDateArray[2] ].join('-')
            data.birthDay = new Date(fomatedDate)
        }
        if (gender) data.gender =  gender 
        if (email) {
            if (! await isValidEmail({ email })) throw new InvalidParamError('email')
            const user = await userDb.findFirst({ where: { email } })
            if(user) throw new AccountAllReadyExistError('email')
            data.email =  email
        }
        await userDb.updateOne({ where: { id }, data })
        const message = { text: 'auth.message.updateProfile' }
        return { message }
    }
}