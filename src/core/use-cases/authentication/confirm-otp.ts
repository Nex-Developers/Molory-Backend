import { InvalidParamError, MissingParamError, OtpIncorrectError, ServerError } from "../../../utils/errors"
import { DbConnection, CacheManager } from "../../../utils/helpers"

export default function makeConfirmOtp({
    getOtp,
    generateToken,
    saveToken,
    removeOtp,
    removeTmpToken,
    saveProfile,
    notifyUser
}: any = {}) {
    if (!saveProfile || !notifyUser || !getOtp || !generateToken || !saveToken || !removeOtp || !removeTmpToken) throw new ServerError()
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
            const { avatar, role, firstName, lastName, email, birthDay, createdAt, signUpMethod } = await prisma.user.update({
                where: { id }, data: { phoneNumber },
                select: {
                    avatar: true,
                    role: true,
                    firstName: true,
                    lastName: true,
                    email: true,
                    birthDay: true,
                    createdAt: true,
                    signUpMethod: true,
                }
            })
            const authToken = await generateToken({ id, role })
            await saveToken({ token: authToken })
            await removeOtp({ phoneNumber })
            await removeTmpToken({ token })
            saveProfile(id)
            return { token: authToken, data: { id, avatar, firstName, lastName, phoneNumber, email, birthDay, createdAt, signUpMethod }, message }
        } else {
            const otpIndex = await getOtp({ phoneNumber, otp })
            if (otpIndex === null || otpIndex === undefined) throw new OtpIncorrectError('')
            // cas of sigup
            let user = await prisma.user.findFirst({ where: { phoneNumber } })
            const phoneNumberVerifiedAt = new Date()
            let firstAuth = false
            return await prisma.$transaction(async (_) => {
                if (!user) {
                    firstAuth = true
                    user = await prisma.user.create({
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
                } else user = await prisma.user.update({ where: { id: user.id }, data: { phoneNumberVerifiedAt } })
                console.log(user)
                if (device.id && device.platform && device.token) {
                    const savedDevice = await prisma.device.findUnique({ where: { id_userId: { id: device.id, userId: user.id} } })
                    if (!savedDevice ) await prisma.device.create({
                        data: {
                            id: device.id,
                            userId: user.id,
                            token: device.token,
                            platform: device.platform
                        }
                    })
                    else if (savedDevice.token != device.token) await prisma.device.update({ where: { id_userId: { id: device.id, userId: user.id }}, data: { token: device.token, updatedAt: new Date() } })
                }

                notifyUser({ id: user.id, titleRef: { text: 'notification.otpVerified.title'}, messageRef: { text: 'notification.otpVerified.message', params: { phoneNumber }}, cover: null, data: { path: 'confirm-otp', id: user.id.toString(), res: 'SUCCESS' } , lang: 'fr', type:  'authentication' })
                const authToken = await generateToken({ id: user.id, role: user.role })
                await saveToken({ token: authToken })
                await removeOtp({ phoneNumber })
                await removeTmpToken({ token })
                saveProfile(user.id)
                const message = { text: 'auth.message.otpVerified' }
                return { token: authToken, data: { id: user.id, avatar: user.avatar, firstName: user.firstName, lastName: user.lastName, phoneNumber: user.phoneNumber, email: user.email, birthDay: user.birthDay, createdAt: user.createdAt, signUpMethod: user.signUpMethod }, firstAuth, message }
            })

        }
    }
}
