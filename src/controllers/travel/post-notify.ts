import { Action, IHttpRequest, IHttpResponse, Log, LogStatus } from "../../core/conventions";
import { HttpResponse, LogManager } from "../../utils/helpers";

export default function makePostNotifyController({
    confirmPayment
}) {
    // use translations
    return async function(request: IHttpRequest): Promise<IHttpResponse> {
        const reqLog: Log = {
            date: new Date().toDateString(), 
            time: new Date().toTimeString(),
            userId: request.ref.id, 
            lastName: 'External',
            firstName: 'CinetPay',
            model: 'Payment',
            path: '/api/travel',
            modelId: '',
            action: Action.WRITE,
            status: LogStatus.FAILED,
            description: `Cinet pay  ${Action.ACTIVATE} payment`
        } 
        try {
            const lang = request.lang,
                body = request.body,
                data = await confirmPayment({
                    id: body.operator_transaction_id,
                    ref: body.transaction_id, 
                    receivedAmount: body.amount, 
                    status: body.sending_status,
                    validatedAt: body.validated_at 
                })
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