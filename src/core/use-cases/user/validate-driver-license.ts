import { AlreadyDoneError, InvalidParamError, MissingParamError, ServerError } from "../../../utils/errors"

export default function makeValidateDriverLicense({
    userDb,
    walletDb,
    saveProfile,
    notifyDevice,
    publicationDb
}: any = {}) {
    if (!userDb || !walletDb || !saveProfile || !notifyDevice || !publicationDb) throw new ServerError()
    return async function ({
        userId,
        response,
        cardNumber
    }: any = {}) {
        if (!userId) throw new MissingParamError('userId')
        if (!cardNumber && response == "validate") throw new MissingParamError('Card Number')

        const user = await userDb.findFirst({ where: { id: userId }, select: { idCardStatus: true, driverLicenseStatus: true, lastName: true, devices: true} })
        if (!user) throw new InvalidParamError('userId')
        if (user.driverLicenseStatus != 2) throw new AlreadyDoneError('before')
        if (response !== "validate") {
            await userDb.updateOne({ where: { id: userId }, data: { driverLicenseStatus: 0, driverLicenseRejectionMessage: response, driverLicenseModifiedAt: new Date() } })
            // if (user.email) sendMail({
            //     to: user.email,
            //     subject: "Your account has been rejected",
            //     text: `Your account has been rejected because: ${failureReason}`
            // })
            // else  sendSms({ to: user.phoneNumber, text: `Your account has been rejected because: ${failureReason}` })
        } else {
            const res: any = { driverLicenseStatus: 1, driverLicenseNumber: cardNumber, driverLicenseModifiedAt: new Date(), status: 1 }
            if (user.idCardStatus == 1) res.role = "driver"
            //  if (user.role === 'user') data.role = "driver"
            // else  sendMail({
            //         to: user.email,
            //         subject: "Complete Id Card",
            //         text: `Complete your Id Card to become a driver`
            //     })
            await userDb.updateOne({ where: { id: userId }, data: res })
            const wallet = await walletDb.findFirst({ where: { id: userId } })
            if (!wallet) await walletDb.insertOne({ data: { id: userId } })
            const deviceTokens = user.devices.map(device => device.token)  
            const { title, body, data, cover } = await notifyDevice({ deviceTokens, titleRef: {text: 'notification.driverActivated.title'}, messageRef:{ text: 'notification.driverActivated.message', params: { name: user.lastName}  }, cover: null, data: null, lang: 'fr' })
                await publicationDb.insertOne({
                    data: {
                        title,
                        message: body,
                        data: data ? JSON.stringify(data) : null,
                        picture: cover,
                        notifications: {
                            create: {
                                user: {
                                    connect: { id: userId }
                                }
                            }
                        }
                    }
                })
            // await sendMail({
            //     to: user.email,
            //     subject: "Your account has been validated",
            //     text: `Your account has been validated`
            // })
        }
        saveProfile(userId)
        const message = { text: "response.edit" }
        return { message }
    }
}