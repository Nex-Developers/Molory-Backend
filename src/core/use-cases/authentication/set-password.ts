import { AccountNotFoundError, InvalidParamError, MissingParamError, ServerError } from "../../../utils/errors"
import { DbConnection } from "../../../utils/helpers"

export default function makeSetPassword({
    generateToken,
    saveToken,
    removeOtp,
    verifyToken,
    comparePasswords,
    removeTmpToken,
    hashPassword,
    getOtp
}: any = {}) {
    if ( !generateToken || !saveToken || !removeOtp || !removeTmpToken || !hashPassword || !getOtp || !comparePasswords) throw new ServerError()
    return async function setPassword({
        token,
        password,
        lang,
        device
    }: any = {}) {
        const prisma = DbConnection.prisma
        if (!device) throw new MissingParamError('device')
        if (!token || !lang) throw new ServerError()
        if (!password) throw new MissingParamError('password')

        // console.log('device', device)
        const { email, otp } = await verifyToken({ token })
        const otpIndex = await getOtp({ phoneNumber: email, otp })
        if (otpIndex === null || otpIndex === undefined) throw new InvalidParamError('token')
        let user = await prisma.user.findFirst({ where: { email } })
        return await prisma.$transaction(async (_) => {
            if (!user) {
                throw new AccountNotFoundError('email')
            }
            const isSamePassword = await comparePasswords({ hash: user.password,  password })
            if (isSamePassword) throw new InvalidParamError('Same password')
            // if (user.password) throw new OtpIncorrectError('')
            password = await hashPassword({ password })
            user = await prisma.user.update({ where: { id: user.id }, data: { password } })
            const savedDevice = await prisma.device.findFirst({ where: { id: device.id, userId: user.id } })
            if (!savedDevice) await prisma.device.create({
                data: {
                    id: device["id"],
                    userId: user["id"],
                    token: device["token"],
                    platform: device["platform"]
                }
            })
            else if (savedDevice.token != device.token) await prisma.device.update({ where: { id_userId: { id: device.id, userId: user.id}}, data: { token: device.token, updatedAt: new Date()}})
            const authToken = await generateToken({ id: user.id, role: user.role })
            await saveToken({ token: authToken })
            await removeOtp({ phoneNumber: email })
            await removeTmpToken({ token })
            const message = { text: 'auth.message.changePassword' }
            return { token: authToken, data: { id: user.id, avatar: user.avatar, firstName: user.firstName, lastName: user.lastName, phoneNumber: user.phoneNumber, email: user.email, birthDay: user.birthDay, createdAt: user.createdAt }, message }
        })
    }
}
