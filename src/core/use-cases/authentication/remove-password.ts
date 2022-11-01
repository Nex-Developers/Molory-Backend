import { InvalidParamError, MissingParamError, OtpIncorrectError, ServerError } from "../../../utils/errors"

export default function makeRemovePassword({
    verifyToken,
    getOtp,
    userDb,
    generateToken,
    saveTmpToken,
    removeTmpToken
}: any = {}) {
    if (!getOtp || !verifyToken || !userDb || !generateToken || !saveTmpToken || !removeTmpToken ) throw new ServerError()
    return async function removePassword({
        token,
        otp,
    }: any = {}) {
        if (!token) throw new MissingParamError('token')
        if (!otp) throw new MissingParamError('otp')
        const { email } = await verifyToken({ token })
        if (!email) throw new InvalidParamError('token')
        const otpIndex = await getOtp({ phoneNumber:email, otp })
        if (otpIndex === null || otpIndex === undefined) throw new OtpIncorrectError('')
        // const user = await userDb.findFirst({ where: { email }, select: { firstName: true, password: true } })
        // if(user.password)   await userDb.updateOne({ where: { email }, data: { password: '' } })
        await removeTmpToken({ token }) 
        token = await generateToken({ email, otp })
         await saveTmpToken({ token })
        const message = { text: 'auth.message.removePassword' }
        return { token, message }
    }
}
