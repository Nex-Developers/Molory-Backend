import { MissingParamError, ServerError } from "../../../utils/errors"

export default function makeListItems({
    configurationDb
}: any = {}) {
    if (!configurationDb) throw new ServerError()
    return async ({
        id
    }: any = {}) => {
        if (!id) throw new MissingParamError('id')

        const data = await configurationDb.findFirst({ 
            where: {
                userId: id
            }, 
            select: {
                prefernceId: true,
                userId: true,
                value: true,
                createdAt: true
            }
        })
        return { data }
    } 
}