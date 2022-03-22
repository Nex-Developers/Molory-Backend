import { MissingParamError, ServerError } from "../../../utils/errors"

export default function makeRemove({
    pricingDb
}: any = {}) {
    if (!pricingDb) throw new ServerError()
    return async ({
        id
    }: any = {}) => {
        if (!id) throw new MissingParamError('id')

        await pricingDb.deleteOne({ 
            where: {
                id
            }
        })
        const message = {text: 'response.remove'}
        return { message }
    } 
}