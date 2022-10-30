import { Action, IHttpRequest, IHttpResponse, Log, LogStatus } from "../../core/conventions";
import { HttpResponse, LogManager } from "../../utils/helpers";

export default function makeSetPasswordController({
    setPassword
}) {
    return async function setPasswordController(request: IHttpRequest): Promise<IHttpResponse> {
        const { email } = request.ref,
            lang = request.lang,
            date = new Date(),
            reqLog: Log = {
                date: date.toDateString(),
                time: date.toTimeString(),
                userId: null,
                email,
                model: 'User',
                path: '/api/auth/set-password',
                modelId: null,
                action: Action.REQUEST,
                status: LogStatus.FAILED,
                description: `${email} ${Action.REQUEST} to set password`
            }
        try {
            const token = request.token,
                { password, device } = request.body,
                data = await setPassword({ token, password, device, lang, email })
            reqLog.userId = data.data.id
            reqLog.modelId = data.data.id.toString()
            reqLog.status = LogStatus.SUCCEEDED
            LogManager.save(reqLog)
            return HttpResponse.ok(data, lang)
        } catch (err) {
            reqLog.failureReason = err.message
            LogManager.save(reqLog)
            return HttpResponse.error(err, lang)()
        }
    }
}
