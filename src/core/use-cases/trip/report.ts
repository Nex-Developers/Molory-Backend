import { MissingParamError } from "../../../utils/errors"
import { DbConnection } from "../../../utils/helpers"

export default function makeReport() {
    const prisma = DbConnection.prisma

    return async ({
        tripId,
        title,
        description, 
    }: any = {}) => {
        if (!tripId) throw new MissingParamError('tripId')
        if (!title) throw new MissingParamError('title')
        if (!description) throw new MissingParamError('description')
     
        await prisma.tripReport.create({ data: { title, description, trip: { connect: { id: tripId}}  }})
        const message = { text: "response.add" }
        return { message }
    } 
}
