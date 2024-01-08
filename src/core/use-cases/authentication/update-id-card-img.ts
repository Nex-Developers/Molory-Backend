import { AlreadyDoneError, InvalidParamError, MissingParamError, ServerError } from "../../../utils/errors"

export default function makeUpdateIdCardImg ({
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
        const user = await userDb.findFirst({ where: { id }, select: { idCardStatus: true, firstName: true, lastName: true}})
        if (!user) throw new InvalidParamError('token')
        if (user.idCardStatus == 2 ) throw new AlreadyDoneError('before')
        // if (user.idCard) deleteAvatarFile(user.idCard)
        const idCardFront =  files[0]
        const backFile = files[1]
        let idCardBack = ''
        if (backFile) idCardBack =  backFile;
        // console.log(idCardFront, idCardBack)
        await userDb.updateOne({ where: { id },  data: { idCardBack, idCardFront, idCardStatus: 2, idCardUploadedAt: new Date() } })
        saveProfile(id)
        notifyDocumentSubmission({ name: user.firstName + " " + user.lastName})
        const message = { text: 'response.update' }
        return { message, data: { idCardFront, idCardBack }}
    }
}
