import { Action, IHttpRequest, IHttpResponse, Log, LogStatus } from "../../core/conventions"
import { ServerError } from "../../utils/errors"
import { HttpResponse, LogManager } from "../../utils/helpers"

export default function makeConfirmEmailController({
    confirmEmail
}: any = {}) {
    if (!confirmEmail) throw new ServerError()
    return async function confirmEmailController(request: IHttpRequest): Promise<IHttpResponse> {
        const { email } = request.ref,
        lang = request.lang,
        date = new Date(),
        reqLog: Log = {
            date: date.toDateString(), 
            time: date.toTimeString(),
            userId: null, 
            email,
            model: 'User',
            path: '/api/auth/confirm-email',
            modelId: '',
            action: Action.ACTIVATE,
            status: LogStatus.FAILED,
            description: `${email} ${Action.ACTIVATE} his account`
        } 
        try {
            const token = request.token,
                data = await confirmEmail({ token,lang })
                reqLog.status = LogStatus.SUCCEEDED
                LogManager.save(reqLog)
            return HttpResponse.ok(data)          
        } catch (err) {
            reqLog.failureReason = err.message
            LogManager.save(reqLog)
            return HttpResponse.error(err, lang)()
        }

    }
}