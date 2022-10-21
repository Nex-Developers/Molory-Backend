import { ServerError, MissingParamError, InvalidParamError } from "../../../utils/errors"

export default function makeRecoverPassword({
    userDb,
    generateToken,
    saveTmpToken,
    askToResetPassword,
    generateOtp,
    saveOtp
}: any = {}) {
    if (!userDb || !generateToken || !saveTmpToken || !askToResetPassword || !generateOtp || !saveOtp ) throw new ServerError()
    return async function recoverPassword({
        email,
        lang
    }: any = {}) {
        if (!email) throw new MissingParamError('email')
        if (!lang) throw new MissingParamError('lang')
        const user = await userDb.findFirst({ where: { email }, select: { firstName: true, emailVerifiedAt: true } })
        if (!user) throw new InvalidParamError('email')
        if (!user.emailVerifiedAt) throw new Error('Your email is not confirmed. Check your box')
        const token = await generateToken({ email })
        const otp = await generateOtp()
        await saveTmpToken({ token })
        await saveOtp({ phoneNumber: email, otp })
        try {
            await askToResetPassword({ email, otp, firstName: user.firstName, lastName: user.lastName, lang: 'fr' })
        } catch (err) {
            console.log(err.message);
            throw new InvalidParamError('email');
        }
        const message = { text: 'auth.message.recoverPassword',  params: { email } }
        return { token, message }
    }
}
