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
            id: true,
            creatAt: true,
            seenAt: true,
            status: true,
            publication: {
                select: {
                    title: true,
                    message: true,
                    sound: true,
                    picture: true,
                    data: true,
                }
            }
        }
        const data = await notificationDb.findMany({
            where: { recieverId: userId, createdAt: { gt: getLastWeeksDate()} },
            select
        })
        return { data }
    }

}
