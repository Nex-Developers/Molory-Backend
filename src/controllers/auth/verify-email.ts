import { Action, IHttpRequest, IHttpResponse, Log, LogStatus } from "../../core/conventions";
import { HttpResponse, LogManager } from "../../utils/helpers";

export default function makeVerifyEmailController({
    checkEmail
}) {
    // use translations
    return async function (request: IHttpRequest): Promise<IHttpResponse> {
        const { email } = request.body,
            lang = request.lang,
            date = new Date(),
            reqLog: Log = {
                date: date.toDateString(),
                time: date.toTimeString(),
                userId: null,
                email,
                model: 'User',
                path: '/api/auth/verify-email',
                modelId: null,
                action: Action.LOGIN,
                status: LogStatus.FAILED,
                description: `${email}  ${Action.LOGIN}`
            }
        try {
            const data = await checkEmail({ email });
            reqLog.status = LogStatus.SUCCEEDED
            LogManager.save(reqLog)
            return HttpResponse.ok(data, lang)
        } catch (err) {
            reqLog.failureReason = err.message
            LogManager.save(reqLog)
            return HttpResponse.error(err, lang)();
        }
    }
}
