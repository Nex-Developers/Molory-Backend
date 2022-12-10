import { ServerError } from "../../../utils/errors"
import moment from "moment"

export default function makeListUsers({
    userDb
}: any = {}) {
    if (!userDb) throw new ServerError()
    return async function listUsers({
        startAt,
        limit
    }: any = {}) {
        if (!startAt) startAt = 0
        if (!limit) limit = 100
        const data = await userDb.findMany({
            startAt, limit, orderBy: { role: 'asc' }, select: {
                id: true,
                avatar: true,
                lastName: true,
                firstName: true,
                phoneNumber: true,
                gender: true,
                email: true,
                signUpMethod: true,
                birthDay: true,
                createdAt: true,
                blockedAt: true,
                role: true
            }
        })
        data.map(item => {
            if (item.birthDay) item.birthDay = moment(item.birthDay).format('DD-MM-YYYY')
            if (item.createdAt) item.createdAt = moment(item.createdAt).format('DD-MM-YYYY')
            return item
        })

        return { data, count: data.length, startAt, limit }
    }
}
