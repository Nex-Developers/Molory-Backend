import { env } from "../../../configs/environment"
import { InvalidParamError, MissingParamError, ServerError } from "../../../utils/errors"

export default function makeUpdateAvatar ({
    userDb,
    deleteAvatarFile,
    saveProfile
}: any = {}) {
    if (!userDb || !deleteAvatarFile || !saveProfile) throw new ServerError()
    return async function updateAvatar({
         id,
        file
    }: any = {}) {
        if (!file) throw new MissingParamError('file')
        console.log('file', file)
        // remove public/ in the avatar name
        const user = await userDb.findFirst({ where: { id }, select: { avatar: true}})
        if (!user) throw new InvalidParamError('token')
        if (user.avatar) deleteAvatarFile(user.avatar)
        const avatar = env.url + file.path.substring(file.path .indexOf("/"));
        await userDb.updateOne({ where: { id },  data: { avatar }})
        const message = { text: 'auth.message.updateAvatar' }
        saveProfile(id)
        return { message, data: { avatar }}
    }
}
