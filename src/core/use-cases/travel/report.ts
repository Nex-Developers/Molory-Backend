import { MissingParamError } from "../../../utils/errors"
import { DbConnection } from "../../../utils/helpers"

export default function makeReport() {

    return async ({
        travelId,
        description,
        userId,
        interrupted 
    }: any = {}) => {
        const prisma = DbConnection.prisma
        if (!travelId) throw new MissingParamError('travelId')
        if (!description) throw new MissingParamError('description')
        
        await prisma.travelReport.create({  data: {  description, interrupted, user: { connect: { id: userId }}, travel: { connect: { id: travelId}}  }})
        if (interrupted) {
            await prisma.travel.update({ where: {id: travelId}, data: { status: -1 }  })
        }
        const message = { text: "response.add" }
        return { message }
    } 
}
