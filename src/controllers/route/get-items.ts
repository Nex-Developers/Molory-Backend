import { Action, IHttpRequest, IHttpResponse, Log, LogStatus } from "../../core/conventions";
import { HttpResponse, LogManager } from "../../utils/helpers";

export default function makeGetItemsController({
    listRoutes
}) {
    // use translations
    return async function (request: IHttpRequest): Promise<IHttpResponse> {
        const reqLog: Log = {
            date: new Date().toDateString(), 
            time: new Date().toTimeString(),
            userId: request.ref.id, 
            lastName: request.ref.lastName,
            firstName: request.ref.firstName,
            model: 'Route',
            path: '/api/route',
            modelId: 'all',
            action: Action.READ,
            status: LogStatus.FAILED,
            description: `${request.ref.lastName}  ${request.ref.firstName}  ${Action.READ} all routes`
        } 

        try {
            const lang = request.lang,
                body = request.params;
                const data = await listRoutes({...body})
                reqLog.status = LogStatus.SUCCEEDED
                reqLog.description += ` (${ data.count }) from ${ data.startAt} to ${ data.startAt + data.limit }`
                LogManager.save(reqLog)
            return HttpResponse.ok(data, lang)
        } catch (err) {
            const lang = request.lang
            reqLog.failureReason = err.message
            LogManager.save(reqLog)
            return HttpResponse.error(err, lang)()
        }
    }
}
