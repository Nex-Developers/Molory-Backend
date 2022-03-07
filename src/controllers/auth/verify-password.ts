import { Action, IHttpRequest, IHttpResponse, Log, LogStatus } from "../../core/conventions";
import { HttpResponse, LogManager } from "../../utils/helpers";

export default function makeVerifyPasswordController({
    checkPassword
}) {
    // use translations
    return async function (request: IHttpRequest): Promise<IHttpResponse> {
        const { id } = request.ref,
            lang = request.lang,
            date = new Date(),
            reqLog: Log = {
                date: date.toDateString(),
                time: date.toTimeString(),
                userId: id,
                model: 'User',
                path: '/api/auth/verify-password',
                modelId: id,
                action: Action.LOGIN,
                status: LogStatus.FAILED,
                description: `${id}  ${Action.LOGIN}`
            }
        try {
            const data = await checkPassword({ id, password: request.body.password, token: request.token });
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
