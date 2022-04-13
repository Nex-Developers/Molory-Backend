import { AlreadyDoneError, InvalidParamError, MissingParamError, ServerError } from "../../../utils/errors"

export default function makeUpdateDriverLicense ({
    userDb,
    // deleteAvatarFile
}: any = {}) {
    if (!userDb ) throw new ServerError()
    return async function ({
         id,
        file
    }: any = {}) {
        if (!file || file == {}) throw new MissingParamError('file')
        console.log('file', file)
        // remove public/ in the avatar name
        const user = await userDb.findFirst({ where: { id }, select: { driverLicense: true, driverLicenseStatus: true}})
        if (!user) throw new InvalidParamError('token')
        if (user.driverLicenseStatus == 2 || user.driverLicenseStatus == 1) throw new AlreadyDoneError('before')
        // if (user.idCard) deleteAvatarFile(user.idCard)
        const driverLicense = file.path.substring(file.path .indexOf("/"));
        userDb.updateOne({ where: { id },  data: { driverLicense, driverLicenseStatus: 2 }})
        const message = { text: 'response.update' }
        return { message, data: { driverLicense }}
    }
}