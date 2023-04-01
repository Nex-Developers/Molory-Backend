import { Promotion } from "@prisma/client"
import { MissingParamError } from "../../../utils/errors"
import { DbConnection } from "../../../utils/helpers"

export default function makeEdit() {
    return async ({
        id,
        name,
        discount,
        description,
        limit,
        startAt,
        endAt
    }: Partial<Promotion>) => {
        const prisma = DbConnection.prisma
        const data: Partial<Promotion> = {}
        if (name) data.name = name.toUpperCase()
        if (discount) data.discount
        if (description) data.description = description
        if (limit) data.limit = limit
        if (startAt) data.startAt = startAt
        if (endAt) data.endAt   = endAt

        if (!Object.keys(data).length) throw new MissingParamError('data')

        await prisma.promotion.update({ where: { id }, data })
        const message = { text: "response.edit" }
        return { message, id }
    } 
}