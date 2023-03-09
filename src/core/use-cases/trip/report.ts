import { MissingParamError } from "../../../utils/errors"
import { DbConnection } from "../../../utils/helpers"

export default function makeReport() {
    const prisma = DbConnection.prisma

    return async ({
        tripId,
        description, 
    }: any = {}) => {
        if (!tripId) throw new MissingParamError('tripId')
        if (!description) throw new MissingParamError('description')
     
        await prisma.tripReport.create({ data: { description, trip: { connect: { id: tripId}}  }})
        const message = { text: "response.add" }
        return { message }
    } 
}
