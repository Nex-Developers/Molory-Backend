import { MissingParamError, ServerError } from "../../../utils/errors"

export default function makeAdd({
    pricingDb
}: any = {}) {
    if (!pricingDb) throw new ServerError()
    return async ({
        vehicleTypeName,
        lowerDistance,
        upperDistance,
        unitPrice
    }: any = {}) => {
        if (!vehicleTypeName) throw new MissingParamError('vehicleTypeName')
        if (!lowerDistance) lowerDistance = 0
        if (!upperDistance) throw new MissingParamError('upperDistance')
        if (!unitPrice) throw new MissingParamError('unitPrice')

        const { id } = await pricingDb.insertOne({ data: { vehicleTypeName, lowerDistance, upperDistance, unitPrice }})
        const message = { text: "response.add"}
        return { message, id }
    } 
}