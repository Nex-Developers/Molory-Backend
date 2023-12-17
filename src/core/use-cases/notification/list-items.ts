import { DbConnection } from "../../../utils/helpers";

export default () => {
    // const getLastWeeksDate = () => {
    //     const now = new Date();
    //     return new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7);
    // }
    return async () => {
       
        const prisma = DbConnection.prisma
        const data = await prisma.publication.findMany({
            select: {
                title: true,
                message: true,
                createdAt: true,
                user: true,
                notifications: true
            },
            orderBy: { id: 'desc'}
        })

        return { data }
    }

}
