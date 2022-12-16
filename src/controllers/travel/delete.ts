import { Action, IHttpRequest, IHttpResponse, Log, LogStatus } from "../../core/conventions";
import { HttpResponse, LogManager } from "../../utils/helpers";

export default function makeDeleteController({
    removeTravel
}) {
    // use translations
    return async function (request: IHttpRequest): Promise<IHttpResponse> {
        const reqLog: Log = {
            date: new Date().toDateString(), 
            time: new Date().toTimeString(),
            userId: request.ref.id, 
            lastName: request.ref.lastName,
            firstName: request.ref.firstName,
            model: 'Travel',
            path: '/api/travel',
            modelId: request.ref.id,
            action: Action.DELETE,
            status: LogStatus.FAILED,
            description: `${request.ref.lastName}  ${request.ref.firstName}  ${Action.DELETE} travel ${request.body.id}`
        } 
        try {
            const lang = request.lang,
                body = request.body,
                data = await removeTravel({ ...body })
                reqLog.status = LogStatus.SUCCEEDED
                LogManager.save(reqLog)
                return HttpResponse.ok(data, lang)
        } catch (err) {
            const lang = request.lang
            reqLog.failureReason = err.message
            LogManager.save(reqLog)
            return HttpResponse.error(err, lang)()
        }
    }
}
