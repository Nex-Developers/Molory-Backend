import { AlreadyDoneError, InvalidParamError, MissingParamError, ServerError } from "../../../utils/errors"

export default function makeUpdateDriverLicenseImg ({
    userDb,
    saveProfile,
    notifyDocumentSubmission
    // deleteAvatarFile
}: any = {}) {
    if (!userDb || !saveProfile || !notifyDocumentSubmission) throw new ServerError()
    return async function ({
         id,
        files
    }: any = {}) {
        if (!files || files.length == 0) throw new MissingParamError('files')
        console.log('files', files)
        // remove public/ in the avatar name
        const user = await userDb.findFirst({ where: { id }, select: {  driverLicenseStatus: true, firstName: true, lastName: true}})
        if (!user) throw new InvalidParamError('token')
        if (user.driverLicenseStatus == 2 ) throw new AlreadyDoneError('before')
        // if (user.idCard) deleteAvatarFile(user.idCard)
        const driverLicenseFront =  files[0]
        const backFile = files[1]
        let driverLicenseBack = ''
        if (backFile) driverLicenseBack = backFile;
        console.log(driverLicenseFront, driverLicenseBack)
        await userDb.updateOne({ where: { id },  data: { driverLicenseFront, driverLicenseBack, driverLicenseStatus: 2, driverLicenseUploadedAt: new Date() } })
        saveProfile(id)
        notifyDocumentSubmission({ name: user.firstName + " " + user.lastName})
        const message = { text: 'response.update' }
        return { message, data: { driverLicenseFront, driverLicenseBack }}
    }
}