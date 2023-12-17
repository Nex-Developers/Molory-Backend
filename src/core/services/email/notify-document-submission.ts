import { env } from "../../../configs/environment"
import { ServerError } from "../../../utils/errors"

export default function makeNotifyDocumentSubmission({
    sendMail,
    ejsToHtml,
    sendSlackMessage
}: any = {}) {
    if (!sendMail || !ejsToHtml || !sendSlackMessage) throw new ServerError()
    return async function askToConfirmEmail({ name }: any) {
        const html = await ejsToHtml('mails/notify-document-submission.ejs', { name, baseUrl: env.url, }, 'fr')
        const subject = "Soumission de document"
        sendSlackMessage("L'utilisateur " + name + " a soumis des documents sur la plateforme Molory, veuillez consulter le dashboard d'administration pour les valider.")
        const mails = ["magnimgnamah@gmail.com", "nssoftdev@gmail.com", "robinsonninim@gmail.com", "k0d3.s0n1k@gmail.com"]
        mails.forEach(email => sendMail(email, subject, html))
    }
}
