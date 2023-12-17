import { MissingParamError, ServerError } from "../../../utils/errors"
import { DbConnection } from "../../../utils/helpers"

export default ({
    notifyUser
}: any) => {
    if (!notifyUser) throw new ServerError()
    return async ({
        userId,
        title,
        body
    }) => {
        if (!title) throw new MissingParamError('id')
        if (!body) throw new MissingParamError('userId')

        const prisma = DbConnection.prisma

        const { id } = await prisma.publication.create({ data: { title, message: body, user: { connect: { id: userId } } } })
        const users = await prisma.user.findMany({ where: { role: { not: 'admin'}}})
        console.log('users', users);
        await users.forEach(async user => {
            console.log(user.id, id);
            await prisma.notification.create({
                data: {
                    publicationId: id,
                    receiverId: user.id
                }
            })
            notifyUser({ id: userId, title, message: body, cover: null,  data: { res:'INFOS'}, lang: 'fr', type: 'announce' })
        })
        const message = { text: 'response.add' }
        return { message }
    }
}
