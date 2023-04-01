import { DbConnection } from "../../../utils/helpers"

export default function makeListItems() {
    return async ({
        startAt,
        limit
    }) => {
        const prisma = DbConnection.prisma
        if (!startAt) startAt = 0
        if (!limit) limit = 1000
        const data = await prisma.promotion.findMany({ where: { deletedAt: null}})
        return { count: data.length, startAt, limit, data }
    } 
}