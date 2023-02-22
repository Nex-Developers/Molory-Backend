import { MissingParamError } from "../../../utils/errors"
import { DbConnection } from "../../../utils/helpers"

export default function makeReport() {

    return async ({
        travelId,
        title,
        description,
        userId 
    }: any = {}) => {
        const prisma = DbConnection.prisma
        if (!travelId) throw new MissingParamError('travelId')
        if (!title) throw new MissingParamError('title')
        if (!description) throw new MissingParamError('description')
     
        await prisma.travelReport.create({  data: { title, description, user: { connect: { id: userId }}, travel: { connect: { id: travelId}}  }})
        const message = { text: "response.add" }
        return { message }
    } 
}
