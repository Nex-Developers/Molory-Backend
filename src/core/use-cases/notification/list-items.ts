import { ServerError } from "../../../utils/errors"

export default ({
    notificationDb
}: any) => {
    const getLastWeeksDate = () => {
        const now = new Date();

        return new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7);
    }
    if (!notificationDb) throw new ServerError()
    return async ({
        userId
    }) => {
        const select: any = {
            createdAt: true,
            seenAt: true,
            status: true,
            publication: {
                select: {
                    id: true,
                    title: true,
                    message: true,
                    sound: true,
                    picture: true,
                    data: true,
                }
            }
        }
        const res = await notificationDb.findMany({
            where: { receiverId: userId, createdAt: { gt: getLastWeeksDate()} },
            select
        })
        return { data: res.map(item =>({
            id: item.publication?.id,
            title: item.publication?.title,
            message: item.publication?.message,
            picture: item.publication?.picture,
            data: item.publucation?.data?JSON.parse(item.publication?.data):null,
            seenAt: item.seenAt,
            createdAt: item.createdAt
        }))}
    }

}
