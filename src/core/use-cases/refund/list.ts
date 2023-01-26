import { DbConnection } from "../../../utils/helpers"

export default function makeList() {
    return async ({
        userId,
        startAt,
        limit
    }: any = {}) => {
        if (!startAt) startAt = 0
        if (!limit) limit = 100
        const prisma = DbConnection.prisma
        let where
        if (userId) where= { userId }

        const data = await prisma.refund.findMany({ 
            where, 
            select: {
                id: true,
                method: true,
                amount: true,
                accessNumber: true,
                createdAt: true,
                validatedAt: true,
                status: true,
                user: { select:{
                    id: true,
                    avatar: true,
                    lastName: true,
                    firstName: true,
                    phoneNumber: true,
                }},
                travelId: true
            }
        })
        return { data }
    } 
}