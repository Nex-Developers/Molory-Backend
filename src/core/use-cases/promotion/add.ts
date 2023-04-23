import { Promotion } from "@prisma/client"
import { MissingParamError } from "../../../utils/errors"
import { DbConnection } from "../../../utils/helpers"

export default function makeAdd() {
    return async ({
        name,
        discount,
        description,
        limit,
        startAt,
        endAt,
        isForDriver
    }: Partial<Promotion>) => {
        const prisma = DbConnection.prisma
        if (!name) throw new MissingParamError('name')
        if (!discount) throw new MissingParamError('discount')
        if (!isForDriver) isForDriver = false
        if (startAt) startAt = new Date(startAt)
        if (endAt) endAt = new Date(endAt)
        const { id } = await prisma.promotion.create({ data: { name: name.toUpperCase(), discount, limit, description, isForDriver, startAt, endAt } })
        const message = { text: "response.add" }
        return { message, id }
    } 
}