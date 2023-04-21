import { ServerError } from "../../../utils/errors"
import { DbConnection } from "../../../utils/helpers"

export default function makeRemoveAccount({
    removeToken
}: any = {}) {
    if (!removeToken) throw new ServerError()
    return async function removeAccount({
        token,
        id
    }: any = {}) {
        const prisma = DbConnection.prisma

        const { email, phoneNumber, firstName, lastName } = await prisma.user.findUnique({ where: { id }})
        await prisma.userArchive.create({ data: { id, email, phoneNumber, firstName, lastName }})
        await prisma.user.update({ where : { id }, data: { email: id, phoneNumber: id, firstName: 'Deleted', lastName: 'Account', deletedAt: new Date()}})
        await removeToken({ token })
        const message = { text: 'auth.message.removeAccount'}
        return { message }
    }
}
