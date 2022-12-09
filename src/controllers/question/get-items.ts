import { Action, IHttpRequest, IHttpResponse, Log, LogStatus } from "../../core/conventions";
import { HttpResponse, LogManager } from "../../utils/helpers";

export default function makeGetItemsController({
    listQuestions
}) {
    // use translations
    return async function (request: IHttpRequest): Promise<IHttpResponse> {
        const reqLog: Log = {
            date: new Date().toDateString(),
            time: new Date().toTimeString(),
            userId: request.ref.id,
            lastName: request.ref.lastName,
            firstName: request.ref.firstName,
            model: 'Question',
            path: '/api/question',
            modelId: 'all',
            action: Action.READ,
            status: LogStatus.FAILED,
            description: `${request.ref.lastName}  ${request.ref.firstName}  ${Action.READ} all questions`
        }

        try {
            const lang = request.lang,
                role = request.ref.role,
                data = await listQuestions({ role })
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
