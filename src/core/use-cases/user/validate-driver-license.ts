import { AlreadyDoneError, InvalidParamError, MissingParamError, ServerError } from "../../../utils/errors"

export default function makeValidateDriverLicense({
    userDb
}: any = {}){
    if (!userDb ) throw new ServerError()
    return async function ({
        userId,
        response,
        failureReason
    }: any = {}){
        if (!userId) throw new MissingParamError('userId')
        if (!failureReason && response == "rejected") throw new MissingParamError('failureReason')

        const user = await userDb.findFirst({ where: { id: userId } })
        if (!user) throw new InvalidParamError('userId')
        if (user.driverLicenseStatus != 2) throw new AlreadyDoneError('before')
        if (response == "rejected") {
            await userDb.updateOne({ where: { id: userId} , data: { idCardStatus: 0 } })
            // if (user.email) sendMail({
            //     to: user.email,
            //     subject: "Your account has been rejected",
            //     text: `Your account has been rejected because: ${failureReason}`
            // })
            // else  sendSms({ to: user.phoneNumber, text: `Your account has been rejected because: ${failureReason}` })
        } else if (response == "validated") {
            const data: any = { driverLicenseStatus: 1}
            if (user.idCardStatus == 1) data.role = "driver"
            // else  sendMail({
            //         to: user.email,
            //         subject: "Complete Id Card",
            //         text: `Complete your Id Card to become a driver`
            //     })
            await userDb.updateOne({ where: { id: userId} , data })
          
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