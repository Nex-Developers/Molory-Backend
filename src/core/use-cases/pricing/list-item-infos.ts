import { MissingParamError, ServerError } from "../../../utils/errors"

export default function makeListItemInfos({
    pricingDb
}: any = {}) {
    if (!pricingDb) throw new ServerError()
    return async ({
        id
    }: any = {}) => {
        if (!id) throw new MissingParamError('id')

        const data = await pricingDb.findFirst({ 
            where: {
                id
            }, 
            select: {
                id: true,
                vehicleTypeName: true,
                lowerDistance: true,
                upperDistance: true,
                unitPrice: true,
                createdAt: true
            }
        })
        return { data }
    } 
}