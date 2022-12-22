import { AccountNotFoundError, InvalidParamError, MissingParamError, OtpIncorrectError, ServerError } from "../../../utils/errors"
import { CacheManager } from "../../../utils/helpers"

export default function makeValidateAccount({
    prisma,
    getOtp,
    userDb,
    deviceDb,
    generateToken,
    saveToken,
    removeOtp,
    removeTmpToken,
    notifyDevice,
    publicationDb,
    saveNotification,
    saveProfile
}: any = {}) {
    if (!saveProfile || !prisma || !getOtp || !userDb || !deviceDb || !generateToken || !saveToken || !removeOtp || !removeTmpToken || !notifyDevice || !saveNotification || !publicationDb) throw new ServerError()
    return async function confirmOtp({
        token,
        email,
        otp,
        lang,
        device,
        changeAuthParam,
    }: any = {}) {
        if (!email) throw new MissingParamError('email')
        if (!otp) throw new MissingParamError('otp')
        if (!token || !lang) throw new ServerError()
        if (changeAuthParam) {
            // change email
            const saved = await CacheManager.get(email)

            // cas of update profile
            console.log('saved', saved)
            if(!saved) throw new InvalidParamError('changeAuthParam')
                // const otpIndex = await getOtp({ phoneNumber, otp })
                // if (otpIndex === null || otpIndex === undefined) throw new OtpIncorrectError('')
                const { id, code } = JSON.parse(saved)
                if (code !== otp) throw new OtpIncorrectError('')
                const message = { text: 'auth.message.emailVerified' }
                const { avatar, role, firstName, lastName, phoneNumber, birthDay, createdAt } = await prisma.user.update({
                    where: { id }, data: { email },
                    select: {
                        avatar: true,
                        role: true,
                        firstName: true,
                        lastName: true,
                        phoneNumber: true,
                        birthDay: true,
                        createdAt: true
                    }
                })
                const authToken = await generateToken({ id, role })
                await saveToken({ token: authToken })
                await removeOtp({ phoneNumber: email })
                await removeTmpToken({ token })
                saveProfile(id)
                return { token: authToken, data: { id, avatar, firstName, lastName, phoneNumber, email, birthDay, createdAt }, message }

        } else {
            if (!device) throw new MissingParamError('device')
            const otpIndex = await getOtp({ phoneNumber: email, otp })
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
                const { title, body, data, cover } = await notifyDevice({ deviceTokens: [device["token"]], titleRef: 'notification.signUpTitle', messageRef: 'notification.signUpMessage', cover: null, data: null, lang: 'fr' })
                await publicationDb.insertOne({
                    data: {
                        title,
                        message: body,
                        data: data ? JSON.stringify(data) : null,
                        picture: cover,
                        notifications: {
                            create: {
                                user: {
                                    connect: { id: user.id }
                                }
                            }
                        }
                    }
                })
                saveProfile(user.id)
                saveNotification({ receiversIds: [user.id], notification: { type: 'sigup', title, message: body, data, picture: cover } })
                const message = { text: 'auth.message.emailVerified' }
                return { token: authToken, data: { id: user.id, avatar: user.avatar, firstName: user.firstName, lastName: user.lastName, phoneNumber: user.phoneNumber, email: user.email, birthDay: user.birthDay, createdAt: user.createdAt }, message }
            })
        }

    }
}
