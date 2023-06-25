import { Action, IHttpRequest, IHttpResponse, Log, LogStatus } from "../../core/conventions";
import { HttpResponse, LogManager } from "../../utils/helpers";

export default function makeGetConfirmController({
    validatePayment
}) {
    // use translations
    return async function(request: IHttpRequest): Promise<IHttpResponse> {
        const reqLog: Log = {
            date: new Date().toDateString(), 
            time: new Date().toTimeString(),
            userId: request.params.id, 
            lastName: 'Fedapay',
            firstName: '',
            model: 'Payment',
            path: '/api/payment',
            modelId: '',
            action: Action.WRITE,
            status: LogStatus.FAILED,
            description: `Fedapay  ${Action.WRITE} payment `
        } 
        try {
            const lang = request.lang,
                data = await validatePayment({ ...request.params})
                reqLog.status = LogStatus.SUCCEEDED
                reqLog.modelId = data.id || ''
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
