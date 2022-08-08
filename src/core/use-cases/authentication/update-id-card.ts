import { AlreadyDoneError, InvalidParamError, MissingParamError, ServerError } from "../../../utils/errors"

export default function makeUpdateIdCard ({
    userDb,
    // deleteAvatarFile
}: any = {}) {
    if (!userDb) throw new ServerError()
    return async function ({
         id,
        files
    }: any = {}) {
        if (!files || files.length == 0) throw new MissingParamError('files')
        console.log('files', files)
        // remove public/ in the avatar name
        const user = await userDb.findFirst({ where: { id }, select: { idCardStatus: true}})
        if (!user) throw new InvalidParamError('token')
        if (user.idCardStatus == 2 ) throw new AlreadyDoneError('before')
        // if (user.idCard) deleteAvatarFile(user.idCard)
        const frontFile = files[0]
        const idCardFront = frontFile.path.substring(frontFile.path .indexOf("/"));
        const backFile = files[1]
        let idCardBack = ''
        if (backFile) idCardBack = backFile.path.substring(backFile.path .indexOf("/"));
        // console.log(idCardFront, idCardBack)
        userDb.updateOne({ where: { id },  data: { idCardBack, idCardFront, idCardStatus: 2 }})
        const message = { text: 'response.update' }
        return { message, data: { idCardFront, idCardBack }}
    }
}