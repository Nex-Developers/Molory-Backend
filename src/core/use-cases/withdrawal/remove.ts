import { MissingParamError, ServerError } from "../../../utils/errors"

export default function makeRemove({
    withdrawalDb
}: any = {}) {
    if (!withdrawalDb) throw new ServerError()
    return async ({
        id
    }: any = {}) => {
        if (!id) throw new MissingParamError('id')

        await withdrawalDb.deleteOne({ 
            where: {
                id
            }
        })
        const message = { text: 'response.remove' }
        return { message }
    } 
}
