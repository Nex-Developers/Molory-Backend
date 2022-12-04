import { Action, IHttpRequest, IHttpResponse, Log, LogStatus } from "../../core/conventions"
import { ServerError } from "../../utils/errors"
import { HttpResponse, LogManager } from "../../utils/helpers"

export default function makeCompleteInfosController({
    setProfile
}: any = {}) {
    if (!setProfile) throw new ServerError()
    return async function completeInfosController(request: IHttpRequest): Promise<IHttpResponse> {
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
                path: '/api/auth/complete-infos',
                modelId: id.toString(),
                action: Action.EDIT,
                status: LogStatus.FAILED,
                description: `${lastName}  ${firstName}  ${Action.EDIT} his infos`
            }
            console.log('id is', id)
        try {
            const body = request.body,
                data = await setProfile({ id, ...body, lang })
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