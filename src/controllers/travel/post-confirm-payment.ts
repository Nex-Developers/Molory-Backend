import { Action, IHttpRequest, IHttpResponse, Log, LogStatus } from "../../core/conventions";
import { HttpResponse, LogManager } from "../../utils/helpers";

export default function makePostConfirmPaymentController({
    confirmPayment
}) {
    // use translations
    return async function(request: IHttpRequest): Promise<IHttpResponse> {
        const reqLog: Log = {
            date: new Date().toDateString(), 
            time: new Date().toTimeString(),
            userId: null, 
            lastName: 'External',
            firstName: 'Fedapay',
            model: 'Payment',
            path: '/api/confirm-payment',
            modelId: '',
            action: Action.WRITE,
            status: LogStatus.FAILED,
            description: `Fedapay  ${Action.ACTIVATE} payment`
        } 
        try {
            
            const lang = request.lang,
                body = request.body
                
                const data = await confirmPayment({
                    id: body.entity.id.toString(),
                    reference: body.entity.reference, 
                    amount: body.entity.amount, 
                    status: body.entity.status === 'approved' ? 1 : 0,
                    validatedAt: body.entity.approved_at 
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