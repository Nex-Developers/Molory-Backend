import { ServerError } from "../../../utils/errors"

export default ({
    answerDb
}: any ) => {
    if (!answerDb)  throw new ServerError()
    return async ({
        role
    }) => {
        const select: any = {
            value: true,
            createdAt: true,
            question: {
                select: {
                    value: true,
                    createdAt: true
                }
            }
        }
        if (role === "admin") select._count = { select: { preferences: true }}
        const data = await answerDb.findMany({
            select
        })
        return { data }
    }
}
