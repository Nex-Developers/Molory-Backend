import { Action, IHttpRequest, IHttpResponse, Log, LogStatus } from "../../core/conventions";
import { HttpResponse, LogManager } from "../../utils/helpers";

export default function makePostValidateIdCardController({
    validateUserIdCard
}) {
    // use translations
    return async function (request: IHttpRequest): Promise<IHttpResponse> {
        const reqLog: Log = {
            date: new Date().toDateString(), 
            time: new Date().toTimeString(),
            userId: request.ref.id, 
            lastName: request.ref.lastName,
            firstName: request.ref.firstName,
            model: 'User',
            path: '/api/validate-id-card',
            modelId: request.body.userId.toString(),
            action: Action.EDIT,
            status: LogStatus.FAILED,
            description: `${request.ref.lastName}  ${request.ref.firstName}  ${Action.EDIT} user ${request.body.userId}`
        } 
        try {
            const lang = request.lang,
                body = request.body,
                data = await validateUserIdCard({...body})
                reqLog.status = LogStatus.SUCCEEDED
                LogManager.save(reqLog)
            return HttpResponse.ok(data, lang)
        } catch (err) {
            reqLog.failureReason = err.message
            LogManager.save(reqLog)
            const lang = request.lang
            return HttpResponse.error(err, lang)()
        }
    }
}
