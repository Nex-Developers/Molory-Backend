import { MissingParamError, ServerError } from "../../../utils/errors"

export default function makeListItemInfos({
    routeDb
}: any = {}) {
    if (!routeDb) throw new ServerError()
    return async ({
        id
    }: any = {}) => {
        if (!id) throw new MissingParamError('id')

        const data = await routeDb.findFirst({ 
            where: {
                id
            }, 
            select: {
                longitude: true,
                latitude: true,
                address: true,
                description: true,
                activateAt: true,
                createdAt: true
            }
        })
        return { data }
    } 
}