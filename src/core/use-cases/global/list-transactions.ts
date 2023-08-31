import { DbConnection } from "../../../utils/helpers"

export default function makeListTransactions() {
    return async ({
        startAt,
        limit,
    }: any = {}) => {
        if (!startAt) startAt = 0
        if (!limit) limit = 100
        const prisma = DbConnection.prisma
        const data = await prisma.transaction.findMany({ orderBy: { createdAt: 'desc'}})
        return { count: data.length, startAt, limit, data }
    } 
}