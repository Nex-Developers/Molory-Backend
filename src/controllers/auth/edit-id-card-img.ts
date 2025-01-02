import { Action, IHttpRequest, IHttpResponse, Log, LogStatus } from "../../core/conventions"
import { ServerError } from "../../utils/errors"
import { HttpResponse, LogManager } from "../../utils/helpers"

export default function makeEditIdCardImgController({
    updateIdCardImg
}: any = {}) {
    if (!updateIdCardImg) throw new ServerError()
    return async function editIdCardImgController(request: IHttpRequest): Promise<IHttpResponse> {
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
            path: '/api/auth/id-card-img',
            modelId: id.toString(),
            action: Action.EDIT,
            status: LogStatus.FAILED,
            description: `${lastName}  ${firstName}  ${Action.EDIT} his infos`
        } 
        try {
                const body = request.body
                delete body.id
                const data = await updateIdCardImg({ id, ...body })
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