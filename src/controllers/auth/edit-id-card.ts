import { Action, IHttpRequest, IHttpResponse, Log, LogStatus } from "../../core/conventions"
import { ServerError } from "../../utils/errors"
import { HttpResponse, LogManager } from "../../utils/helpers"

export default function makeEditIdCardController({
    updateIdCard
}: any = {}) {
    if (!updateIdCard) throw new ServerError()
    return async function editIdCardController(request: IHttpRequest): Promise<IHttpResponse> {
        const { id, lastName, firstName } = request.ref,
        lang = request.lang,
        date = new Date(),
        reqLog: Log = {
            date: date.toDateString(), 
            time: date.toTimeString(),
            userId: id, 
            lastName,
            firstName,
            model: 'User',
            path: '/api/auth/id-card',
            modelId: id.toString(),
            action: Action.ULPLOAD,
            status: LogStatus.FAILED,
            description: `${lastName}  ${firstName}  ${Action.ULPLOAD} his ID card`
        }
        try {
                const file = request.file,
                data = await updateIdCard({ id, file })
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