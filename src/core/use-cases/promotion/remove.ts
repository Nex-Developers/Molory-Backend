import { Promotion } from "@prisma/client"
import { MissingParamError } from "../../../utils/errors"
import { DbConnection } from "../../../utils/helpers"

export default function makeRemove() {
    return async ({
        id
    }: Partial<Promotion>) => {
        const prisma = DbConnection.prisma
        if (!id) throw new MissingParamError('id')

        await prisma.promotion.update({ where: { id }, data: { deletedAt: new Date() } })
        const message = { text: "response.remove" }
        return { message, id }
    } 
}