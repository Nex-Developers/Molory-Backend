import { ServerError } from "../../../utils/errors"

export default function makeNotifyDocumentSubmission({
    sendMail,
    ejsToHtml
}: any = {}) {
    if (!sendMail || !ejsToHtml) throw new ServerError()
    return async function askToConfirmEmail({ name }: any) {
        const html = await ejsToHtml('mails/notify-document-submission.ejs', { name }, 'fr')
        const subject = "Soumission de document"
        const mails = ["magnimgnamah@gmail.com", "nssoftdev@gmail.com", "robinsonninim@gmail.com", "k0d3.s0n1k@gmail.com"]
        mails.forEach(email => sendMail(email, subject, html))
    }
}
