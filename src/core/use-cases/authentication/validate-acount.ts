import { AccountNotFoundError, MissingParamError, OtpIncorrectError, ServerError } from "../../../utils/errors"

export default function makeValidateAccount({
    prisma,
    getOtp,
    userDb,
    deviceDb,
    generateToken,
    saveToken,
    removeOtp,
    removeTmpToken
}: any = {}) {
    if (!prisma || !getOtp || !userDb || !deviceDb || !generateToken || !saveToken || !removeOtp || !removeTmpToken) throw new ServerError()
    return async function confirmOtp({
        token,
        email,
        otp,
        lang,
        device
    }: any = {}) {
        if (!email) throw new MissingParamError('email')
        if (!otp) throw new MissingParamError('otp')
        if (!device) throw new MissingParamError('device')
        if (!token || !lang) throw new ServerError()
        console.log('device', device)
        const otpIndex = await getOtp({ phoneNumber:email, otp })
        if (otpIndex === null || otpIndex === undefined) throw new OtpIncorrectError('')

        let user = await userDb.findFirst({ where: { email } })
        const emailVerifiedAt = new Date()
        return await prisma.$transaction(async (_) => {
            if (!user) {
                throw new AccountNotFoundError('email')
            } else user = await userDb.updateOne({ where: { id: user.id }, data: { emailVerifiedAt, status: 2 } })
            const savedDevice = await deviceDb.findFirst({ where: { id: device.id, userId: user.id } })
            if (!savedDevice) await deviceDb.insertOne({
                data: {
                    id: device["id"],
                    userId: user["id"],
                    token: device["token"],
                    platform: device["platform"]
                }
            })
            const authToken = await generateToken({ id: user.id, role: user.role })
            await saveToken({ token: authToken })
            await removeOtp({ phoneNumber: email })
            await removeTmpToken({ token })
            const message = { text: 'auth.message.emailVerified' }
            return { token: authToken, data: { id: user.id, avatar: user.avatar, firstName: user.firstName, lastName: user.lastName, phoneNumber: user.phoneNumber, email: user.email, birthDay: user.birthDay, createdAt: user.createdAt }, message } 
        })
    }
}
