import { AccountNotFoundError, MissingParamError, OtpIncorrectError, ServerError } from "../../../utils/errors"

export default function makeSetPassword({
    prisma,
    userDb,
    deviceDb,
    generateToken,
    saveToken,
    removeOtp,
    removeTmpToken,
    hashPassword,
}: any = {}) {
    if (!prisma || !userDb || !deviceDb || !generateToken || !saveToken || !removeOtp || !removeTmpToken || !hashPassword) throw new ServerError()
    return async function setPassword({
        token,
        email,
        password,
        lang,
        device
    }: any = {}) {
        if (!email) throw new MissingParamError('email')
        if (!device) throw new MissingParamError('device')
        if (!token || !lang) throw new ServerError()
        if (!password) throw new MissingParamError('password')

        console.log('device', device)
      
        let user = await userDb.findFirst({ where: { email } })
         password = await hashPassword({ password })
        return await prisma.$transaction(async (_) => {
            if (!user) {
                throw new AccountNotFoundError('email')
            } 
            if (user.password) throw new OtpIncorrectError('')
            user = await userDb.updateOne({ where: { id: user.id }, data: { password } })
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
            const message = { text: 'auth.message.changePassword' }
            return { token: authToken, data: { id: user.id, avatar: user.avatar, firstName: user.firstName, lastName: user.lastName, phoneNumber: user.phoneNumber, email: user.email, birthDay: user.birthDay, createdAt: user.createdAt }, message } 
        })
    }
}
