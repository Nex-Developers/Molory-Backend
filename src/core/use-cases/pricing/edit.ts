import { MissingParamError, ServerError } from "../../../utils/errors"

export default function makeEdit({
    pricingDb
}: any = {}) {
    if (!pricingDb) throw new ServerError()
    return async ({
        id,
        vehicleTypeName,
        lowerDistance,
        upperDistance,
        unitPrice
    }: any = {}) => {
        if (!id) throw new MissingParamError('id')

        const data: any = {}
        if (vehicleTypeName) data.vehicleTypeName = vehicleTypeName
        if (lowerDistance) data.lowerDistance = lowerDistance
        if (upperDistance) data.upperDistance = upperDistance
        if (unitPrice) data.unitPrice = unitPrice

        
        if( Object.keys(data).length === 0) throw new MissingParamError('all')
        await pricingDb.updateOne({ where: { id}, data })
        const message = "response.edit"
        return { message }
    } 
}