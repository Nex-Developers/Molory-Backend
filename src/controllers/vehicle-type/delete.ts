import { Action, IHttpRequest, IHttpResponse, Log, LogStatus } from "../../core/conventions";
import { HttpResponse, LogManager } from "../../utils/helpers";

export default function makeDeleteController({
    removeVehicleType
}) {
    // use translations
    return async function (request: IHttpRequest): Promise<IHttpResponse> {
        const reqLog: Log = {
            date: new Date().toDateString(), 
            time: new Date().toTimeString(),
            userId: request.ref.id, 
            lastName: request.ref.lastName,
            firstName: request.ref.firstName,
            model: 'VehicleType',
            path: '/api/vehicle-type',
            modelId: request.ref.id,
            action: Action.DELETE,
            status: LogStatus.FAILED,
            description: `${request.ref.lastName}  ${request.ref.firstName}  ${Action.DELETE} vehicle type ${request.body.id}`
        } 
        try {
            const lang = request.lang,
                { id } = request.body,
                data = await removeVehicleType({ id })
                reqLog.status = LogStatus.SUCCEEDED
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
