import { AlreadyDoneError, InvalidParamError, MissingParamError, ServerError } from "../../../utils/errors"

export default function makeValidateUserIdCard({
    userDb,
    // sendMail,
    // sendSms
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
        if (user.idCardStatus != 2) throw new AlreadyDoneError('before')
        if (response == "rejected") {
            await userDb.updateOne({ where: { id: userId} , data: { idCardStatus: 0 } })
        //    if (user.email) await sendMail({
        //         to: user.email,
        //         subject: "Your account has been rejected",
        //         text: `Your account has been rejected because: ${failureReason}`
        //     })
        //     else await sendSms({ to: user.phoneNumber, text: `Your account has been rejected because: ${failureReason}` })
        } else if (response == "validated") {
            const data: any = { idCardStatus: 1}
            if (user.driverLicenseStatus == 1) data.role = "driver"
            await userDb.updateOne({ where: { id: userId} , data })
          
            // await sendMail({
            //     to: user.email,
            //     subject: "Your account has been validated",
            //     text: `Your account has been validated`
            // })
        } else throw new InvalidParamError('response')

        const message = { text: "response.edit"}
        return { message }
    } 
}