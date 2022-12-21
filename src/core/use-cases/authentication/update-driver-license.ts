import { env } from "../../../configs/environment"
import { AlreadyDoneError, InvalidParamError, MissingParamError, ServerError } from "../../../utils/errors"

export default function makeUpdateDriverLicense ({
    userDb,
    saveProfile
    // deleteAvatarFile
}: any = {}) {
    if (!userDb || !saveProfile ) throw new ServerError()
    return async function ({
         id,
        files
    }: any = {}) {
        if (!files || files.length == 0) throw new MissingParamError('files')
        console.log('files', files)
        // remove public/ in the avatar name
        const user = await userDb.findFirst({ where: { id }, select: {  driverLicenseStatus: true}})
        if (!user) throw new InvalidParamError('token')
        if (user.driverLicenseStatus == 2 ) throw new AlreadyDoneError('before')
        // if (user.idCard) deleteAvatarFile(user.idCard)
        const frontFile = files[0]
        const driverLicenseFront =  env.url + frontFile.path.substring(frontFile.path .indexOf("/"));
        const backFile = files[1]
        let driverLicenseBack = ''
        if (backFile) driverLicenseBack =  env.url + backFile.path.substring(backFile.path .indexOf("/"));
        console.log(driverLicenseFront, driverLicenseBack)
        await userDb.updateOne({ where: { id },  data: { driverLicenseFront, driverLicenseBack, driverLicenseStatus: 2, driverLicenseUploadedAt: new Date() } })
        saveProfile(id)
        const message = { text: 'response.update' }
        return { message, data: { driverLicenseFront, driverLicenseBack }}
    }
}