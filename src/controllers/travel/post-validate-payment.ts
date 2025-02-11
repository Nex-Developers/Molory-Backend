import { Action, IHttpRequest, IHttpResponse, Log, LogStatus } from "../../core/conventions";
import { HttpResponse, LogManager } from "../../utils/helpers";

export default function makePostValidatePaymentController({
    confirmPayment
}) {
    // use translations
    return async function(request: IHttpRequest): Promise<IHttpResponse> {
        const reqLog: Log = {
            date: new Date().toDateString(), 
            time: new Date().toTimeString(),
            userId: request?.ref?.id || 'userId', 
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
                body = request.body
                const { entity, name } = body
                console.log(name)
                const data = await confirmPayment({
                    id: entity.id,
                    ref: entity.ref, 
                    receivedAmount: entity.amount, 
                    status:  (entity.status === 'canceled' || entity.status === 'declined') ? 0 : entity.status === 'approved' ? 1 : -1,
                    validatedAt: new Date()
                })
                // data = await confirmPayment({ ...body })
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