import { env } from "../../../configs/environment"
import { ServerError } from "../../../utils/errors"

export default function makeAskToConfirmEmail({
    sendMail,
    apiUrl,
    ejsToHtml
}: any = {}) {
    if (!sendMail || !apiUrl || !ejsToHtml ) throw new ServerError()
    return async function askToConfirmEmail({
        email,
        otp,
        firstName,
        lang
    }: any = {}) {
        if (!email || !otp || !firstName || !lang) throw new ServerError()
        console.log(otp)
        const salutationText = { text: 'auth.confirmationMail.salutation', params: { name: firstName }},
            thanks = {text: 'auth.confirmationMail.thanks'},
            senderName = {text: 'auth.confirmationMail.sender' },
            message =  {text: 'auth.confirmationMail.message' },
            // confirmButtonText = {text: 'auth.confirmationMail.button' },
            // responseUrl = apiUrl + 'api/auth/confirm-email?token='+token+'&lang='+lang,
            html = await ejsToHtml('mails/email-confirmation.ejs', { baseUrl: env.url, otp, message, salutationText, thanks, senderName }, 'fr')
        const subject = "Confirmation mail"
        return await sendMail(email, subject, html)
    }
}
