import { AlreadyDoneError, InvalidParamError, MissingParamError, ServerError } from "../../../utils/errors"

export default function makeValidateUserIdCard({
    userDb,
    walletDb
    // sendMail,
    // sendSms
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
        if (user.idCardStatus != 2) throw new AlreadyDoneError('before')
        if (response !== "validate") {
            await userDb.updateOne({ where: { id: userId} , data: { idCardStatus: 0, idCardRejectionMessage: response, idCardModifiedAt: new Date() } })
        //    if (user.email) await sendMail({
        //         to: user.email,
        //         subject: "Your account has been rejected",
        //         text: `Your account has been rejected because: ${failureReason}`
        //     })
        //     else await sendSms({ to: user.phoneNumber, text: `Your account has been rejected because: ${failureReason}` })
        } else {
            const data: any = { idCardStatus: 1,  idCardNumber: cardNumber, idCardModifiedAt: new Date(), status: 1}
            if (user.role === 'user') data.role = "driver"
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