import { InvalidParamError, MissingParamError, OtpIncorrectError, ServerError } from "../../../utils/errors"
import { DbConnection, CacheManager } from "../../../utils/helpers"

export default function makeConfirmOtp({
    getOtp,
    userDb,
    deviceDb,
    generateToken,
    saveToken,
    removeOtp,
    removeTmpToken,
    saveProfile
}: any = {}) {
    if (!saveProfile || !getOtp || !userDb || !deviceDb || !generateToken || !saveToken || !removeOtp || !removeTmpToken) throw new ServerError()
    return async function confirmOtp({
        token,
        phoneNumber,
        otp,
        lang,
        device,
        changeAuthParam
    }: any = {}) {
        if (!phoneNumber) throw new MissingParamError('phoneNumber')
        if (!otp) throw new MissingParamError('otp')
        if (!device) throw new MissingParamError('device')
        if (!token || !lang) throw new ServerError()
        const prisma = DbConnection.prisma
        console.log('change auth param', changeAuthParam)
        if (changeAuthParam) {
            const saved = await CacheManager.get(phoneNumber)

            // cas of update profile
            console.log('saved', saved)
            if(!saved) throw new InvalidParamError('changeAuthParam')
            // const otpIndex = await getOtp({ phoneNumber, otp })
            // if (otpIndex === null || otpIndex === undefined) throw new OtpIncorrectError('')
            const { id, code } = JSON.parse(saved)
            if (code !== otp) throw new OtpIncorrectError('')
            const message = { text: 'auth.message.otpVerified' }
            const { avatar, role, firstName, lastName, email, birthDay, createdAt } = await prisma.user.update({
                where: { id }, data: { phoneNumber },
                select: {
                    avatar: true,
                    role: true,
                    firstName: true,
                    lastName: true,
                    email: true,
                    birthDay: true,
                    createdAt: true
                }
            })
            const authToken = await generateToken({ id, role })
            await saveToken({ token: authToken })
            await removeOtp({ phoneNumber })
            await removeTmpToken({ token })
            saveProfile(id)
            return { token: authToken, data: { id, avatar, firstName, lastName, phoneNumber, email, birthDay, createdAt }, message }
        } else {
            const otpIndex = await getOtp({ phoneNumber, otp })
            if (otpIndex === null || otpIndex === undefined) throw new OtpIncorrectError('')
            // cas of sigup
            let user = await userDb.findFirst({ where: { phoneNumber } })
            const phoneNumberVerifiedAt = new Date()
            let firstAuth = false
            return await prisma.$transaction(async (_) => {
                if (!user) {
                    firstAuth = true
                    user = await userDb.insertOne({
                        data: {
                            phoneNumber,
                            phoneNumberVerifiedAt,
                            role: 'user',
                            status: 2,
                            firstName: "",
                            lastName: "",
                            language: lang,
                            password: "",
                            signUpMethod: "phoneNumber",
                        }
                    })
                } else user = await userDb.updateOne({ where: { id: user.id }, data: { phoneNumberVerifiedAt } })
                console.log(user)
                if (device.id && device.platform && device.token) {
                    const savedDevice = await deviceDb.findFirst({ where: { id: device.id, userId: user.id } })
                    if (!savedDevice) await deviceDb.insertOne({
                        data: {
                            id: device.id,
                            userId: user.id,
                            token: device.token,
                            platform: device.platform
                        }
                    })
                }
                const authToken = await generateToken({ id: user.id, role: user.role })
                await saveToken({ token: authToken })
                await removeOtp({ phoneNumber })
                await removeTmpToken({ token })
                saveProfile(user.id)
                const message = { text: 'auth.message.otpVerified' }
                return { token: authToken, data: { id: user.id, avatar: user.avatar, firstName: user.firstName, lastName: user.lastName, phoneNumber: user.phoneNumber, email: user.email, birthDay: user.birthDay, createdAt: user.createdAt }, firstAuth, message }
            })

        }
    }
}
