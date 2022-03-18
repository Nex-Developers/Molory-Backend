import { MissingParamError, ServerError } from "../../../utils/errors"

export default function makeListItemInfos({
    stopDb
}: any = {}) {
    if (!stopDb) throw new ServerError()
    return async ({
        id
    }: any = {}) => {
        if (!id) throw new MissingParamError('id')

        const data = await stopDb.findFirst({ 
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