import { AlreadyDoneError, InvalidParamError, MissingParamError, ServerError } from "../../../utils/errors"
import { CacheManager } from "../../../utils/helpers"

export default function makeChangeEmail({
    userDb,
    generateToken,
    removeToken,
    saveTmpToken,
    askToConfirmEmail,
    isValidEmail,
    generateOtp
}: any = {}) {
    if (!userDb ||!generateOtp || !generateToken || !saveTmpToken || !askToConfirmEmail || ! isValidEmail || !removeToken) throw new ServerError()
    return async function changeEmail({
        id,
        email,
        lang
    }: any = {}) {
        if (!id) throw new MissingParamError('id')
        if (!email) throw new MissingParamError('email')
        if (!isValidEmail({ email }))  throw new InvalidParamError('email')
        if (!lang) throw new MissingParamError('lang')

        const user = await userDb.findFirst({ where: { id }, select: { email: true, firstName: true, emailVerifiedAt: true}})
        console.log(user)
        if (!user) throw new InvalidParamError('id')
        // if(!user.emailConfirmedAt) throw new Error('Your first email is not confirmed.')
        if(user.email === email) throw new AlreadyDoneError('before')
        const otp = await generateOtp()
        // await userDb.updateOne({ where: { id }, data: { email, emailVerifiedAt:  null} })
        const token = await generateToken({ email })
        await saveTmpToken({ token })
        await askToConfirmEmail({ email, otp, firstName: user.firstName, lang })
        await CacheManager.set(email, JSON.stringify({ id, code: otp.toString() }))
        const message = { text: 'auth.message.changeEmail', params: { email }}
        return { message, token }
    }
}