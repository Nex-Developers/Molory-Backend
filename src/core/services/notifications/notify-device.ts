import { ServerError } from "../../../utils/errors"

export default function makeNotifyDevice({
    sendNotification,
    translate
}: any = {}) {
    if (!sendNotification || !translate) throw new ServerError()
    return async function notifyDevice({
        deviceTokens,
        titleRef,
        messageRef,
        cover,
        data,
        lang
    }: any = {}) {
        if (!titleRef || !messageRef) throw new ServerError()
        const title = translate(lang, titleRef.text, titleRef.params)
        const body = translate(lang, messageRef.text, messageRef.params)
        // data = JSON.stringify(data)
        try {
            if (deviceTokens && deviceTokens.length) sendNotification(deviceTokens, title, body, data, cover)
        } catch (err) {
            console.log(err.message)
        }
        return { title, body, data, cover }
    }
}
