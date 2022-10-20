import { ServerError, MissingParamError, AccountNotFoundError, UnmatchedAuthMethodError } from "../../../utils/errors"

export default function makeCheckEmail({
    userDb,
    generateToken,
    saveTmpToken,
    generateOtp,
    saveOtp,
    askToConfirmEmail,
}: any = {}) {
    if (!userDb || !generateToken || !saveTmpToken || !generateOtp || !saveOtp || !askToConfirmEmail) throw new ServerError()
    return async function ({
        email
    }: any = {}) {
        if (!email) throw new MissingParamError('email')
        const user = await userDb.findFirst({ where: { email }, select: { id: true, emailVerifiedAt: true, firstName: true, lastName: true, phoneNumber: true, signUpMethod: true } })
        // console.log(user);
        if (!user) throw new AccountNotFoundError('email')

        if (user.signUpMethod == 'phoneNumber') {
            const truncateParam = '+' + user.phoneNumber.substring(0, 6) + '...';
            throw new UnmatchedAuthMethodError(truncateParam);
        }

        if (!user.emailVerifiedAt) {
            // throw new NotVerifiedCredentialError()
            const token = await generateToken({ email })
            const otp = await generateOtp()
            await saveTmpToken({ token })
            await saveOtp({ phoneNumber:email, otp })
            await askToConfirmEmail({ email, otp, firstName: user.firstName, lastName: user.lastName, lang: 'fr' })
            const error = { text: 'error.notVerifiedCredential', params: { parameter: 'email' } }
            return { token, error }
        }

        const token = await generateToken({ id: user.id })
        await saveTmpToken({ token })
        const message = { text: 'auth.message.checkEmail' }
        return { token, message }
    }
}