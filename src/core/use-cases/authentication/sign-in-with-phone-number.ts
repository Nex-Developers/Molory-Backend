import { ServerError, MissingParamError, InvalidParamError, AccountNotFoundError, AccountAllReadyExistError } from "../../../utils/errors"

export default function makeSignInWithPhoneNumber({
    generateOtp,
    saveOtp,
    sendOtp,
    generateToken,
    saveTmpToken,
    userDb
}: any = {}) {
    if (!generateOtp || !saveOtp || !sendOtp || !generateToken || !saveTmpToken || !userDb) throw new ServerError()
    return async function signInWithPhoneNumber({
        phoneNumber,
        action
    }: any = {}) {
        if (!phoneNumber) throw new MissingParamError('phoneNumber')
        if (phoneNumber.charAt(0) == '+') throw new InvalidParamError('phoneNumber')
        if (phoneNumber.length < 9) throw new InvalidParamError('phoneNumber')
        if (!action) action = 'signin'
        const user = await userDb.findFirst({ where: { phoneNumber }, select: { id: true } })
        if (action == 'signin') {
            if (!user) throw new AccountNotFoundError('phoneNumber')
        } else {
            if (user) throw new AccountAllReadyExistError('phoneNumber')
        }
        const otp = await generateOtp()
        const token = await generateToken({ phoneNumber })
        await saveTmpToken({ token })
        await saveOtp({ phoneNumber, otp })
        await sendOtp({ phoneNumber, otp })
        const message = { text: 'auth.message.signinWithPhone', params: { phoneNumber }}
        return { token, message }
    }
}
