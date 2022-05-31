import { Action, IHttpRequest, IHttpResponse, Log, LogStatus } from "../../core/conventions";
import { HttpResponse, LogManager } from "../../utils/helpers";

export default function makePostController({
    addNewsletter
}) {
    // use translations
    return async function(request: IHttpRequest): Promise<IHttpResponse> {
        const { email, name } = request.body,
        reqLog: Log = {
            date: new Date().toDateString(), 
            time: new Date().toTimeString(),
            userId: email, 
            lastName: 'Guest',
            firstName: name,
            model: 'Newsletter',
            path: '/api/newsletter',
            modelId: email,
            action: Action.WRITE,
            status: LogStatus.FAILED,
            description: `${ name }  susbscribe to newsletter`
        } 
        try {
            const lang = request.lang,
                data = await addNewsletter({email, name })
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
