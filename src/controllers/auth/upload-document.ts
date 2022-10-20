import { Action, IHttpRequest, IHttpResponse, Log, LogStatus } from "../../core/conventions"
import { ServerError } from "../../utils/errors"
import { HttpResponse, LogManager } from "../../utils/helpers"

export default function makeUploadDocumentController({
    updateDriverLicense,
    updateIdCard
}: any = {}) {
    if (!updateDriverLicense || !updateIdCard) throw new ServerError()
    return async function (request: IHttpRequest): Promise<IHttpResponse> {
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
                path: '/api/auth/upload-document',
                modelId: id.toString(),
                action: Action.ULPLOAD,
                status: LogStatus.FAILED,
                description: `${lastName}  ${firstName}  ${Action.ULPLOAD} his documents`
            }
        try {
            const dlFiles = request.files['driverLicense'],
                icFiles = request.files['idCard']
            let dlRes, icRes
            if (dlFiles) dlRes = await updateDriverLicense({ id, files: dlFiles })
            if (icFiles) icRes = await updateIdCard({ id, files: icFiles })
            const data: any = {driverLicenseFront: '', driverLicenseBack: '', idCardFront: '', idCardBack: '', message: ''}
            if (dlRes) {
                data.driverLicenseFront = dlRes.data.driverLicenseFront
                data.driverLicenseBack = dlRes.data.driverLicenseBack
                data.message = dlRes.message
            }
            if (icRes) {
                data.idCardFront = icRes.data.idCardFront
                data.idCardBack = icRes.data.idCardBack
                data.message = icRes.message
            }
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