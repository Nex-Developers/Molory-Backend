import { Action, IHttpRequest, IHttpResponse, Log, LogStatus } from "../../core/conventions";
import { HttpResponse, LogManager } from "../../utils/helpers";

export default function makeVerifyAccountController({
    validateAccount
}) {
    return async function verifyAccountController(request: IHttpRequest): Promise<IHttpResponse> {
        const { email } = request.ref,
            lang = request.lang,
            date = new Date(),
            reqLog: Log = {
                date: date.toDateString(),
                time: date.toTimeString(),
                userId: null,
                email,
                model: 'User',
                path: '/api/auth/verify-account',
                modelId: null,
                action: Action.REQUEST,
                status: LogStatus.FAILED,
                description: `${email} ${Action.REQUEST} to confirm account`
            }
        try {
            const token = request.token,
                { otp, device } = request.body,
                data = await validateAccount({ token, otp, device, lang, email })
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
