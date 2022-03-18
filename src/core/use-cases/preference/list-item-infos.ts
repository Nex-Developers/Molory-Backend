import { MissingParamError, ServerError } from "../../../utils/errors"

export default function makeListItemInfos({
    preferenceDb
}: any = {}) {
    if (!preferenceDb) throw new ServerError()
    return async ({
        id
    }: any = {}) => {
        if (!id) throw new MissingParamError('id')

        const data = await preferenceDb.findFirst({ 
            where: {
                id
            }, 
            select: {
                id: true,
                title: true,
                description: true,
                createdAt: true
            }
        })
        return { data }
    } 
}