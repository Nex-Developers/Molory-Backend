import { AlreadyDoneError, InvalidParamError, MissingParamError, ServerError } from "../../../utils/errors"

export default function makeValidateDriverLicense({
    userDb,
    walletDb
}: any = {}){
    if (!userDb || !walletDb ) throw new ServerError()
    return async function ({
        userId,
        response,
        cardNumber
    }: any = {}){
        if (!userId) throw new MissingParamError('userId')
        if (!cardNumber && response == "validate") throw new MissingParamError('Card Number')

        const user = await userDb.findFirst({ where: { id: userId } })
        if (!user) throw new InvalidParamError('userId')
        if (user.driverLicenseStatus != 2) throw new AlreadyDoneError('before')
        if (response !== "validate") {
            await userDb.updateOne({ where: { id: userId} , data: { driverLicenseStatus: 0, driverLicenseRejectionMessage: response,  driverLicenseModifiedAt: new Date()} })
            // if (user.email) sendMail({
            //     to: user.email,
            //     subject: "Your account has been rejected",
            //     text: `Your account has been rejected because: ${failureReason}`
            // })
            // else  sendSms({ to: user.phoneNumber, text: `Your account has been rejected because: ${failureReason}` })
        } else {
            const data: any = { driverLicenseStatus: 1, driverLicenseNumber: cardNumber, driverLicenseModifiedAt: new Date()}
            // if (user.idCardStatus == 1) data.role = "driver"
             if (user.role === 'user') data.role = "driver"
            // else  sendMail({
            //         to: user.email,
            //         subject: "Complete Id Card",
            //         text: `Complete your Id Card to become a driver`
            //     })
            await userDb.updateOne({ where: { id: userId} , data })
            await walletDb.insertOne({ data: { userId }})
            // await sendMail({
            //     to: user.email,
            //     subject: "Your account has been validated",
            //     text: `Your account has been validated`
            // })
        }

        const message = { text: "response.edit"}
        return { message }
    } 
}