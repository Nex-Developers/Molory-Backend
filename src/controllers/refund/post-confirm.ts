import { Action, IHttpRequest, IHttpResponse, Log, LogStatus } from "../../core/conventions";
import { HttpResponse, LogManager } from "../../utils/helpers";

export default function makePostConfirmController({
    confirmRefund
}) {
    // use translations
    return async function(request: IHttpRequest): Promise<IHttpResponse> {
        const reqLog: Log = {
            date: new Date().toDateString(), 
            time: new Date().toTimeString(),
            userId: 0, 
            lastName: 'Cinetpay',
            firstName: '',
            model: 'Refund',
            path: '/api/refund',
            modelId: '',
            action: Action.WRITE,
            status: LogStatus.FAILED,
            description: `Cinetpay validate refund`
        } 
        try {
            const lang = request.lang,
                body = request.body,
                data = await confirmRefund({...body})
                reqLog.status = LogStatus.SUCCEEDED
                reqLog.modelId = data.id
                reqLog.description += data.id
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
