import { MissingParamError, ServerError } from "../../../utils/errors"

export default function makeListItemInfos({
    tripDb
}: any = {}) {
    if (!tripDb) throw new ServerError()
    return async ({
        id
    }: any = {}) => {
        if (!id) throw new MissingParamError('id')

        const data = await tripDb.findFirst({ 
            where: {
                id: true
            }, 
            select: {
                id: true,
                seats: true,
                reamingSeats: true,
                status: true,
                routes: true,
                createdAt: true
            }
        })
        return { data }
    } 
}