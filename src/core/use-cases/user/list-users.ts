import { ServerError } from "../../../utils/errors"
import moment  from "moment"

export default function makeListUsers({
    userDb
}: any = {}) {
    if (!userDb) throw new ServerError()
    return async function listUsers ({
        startAt,
        limit
    }: any ={}) {
        if (!startAt) startAt = 0
        if (!limit) limit = 100
        const data = await userDb.findMany({ startAt, limit, orderBy: { role: 'asc'}, select:{
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
        }})
        data.birthDay = moment(data.birthDay).format('DD-MM-YYYY')
        data.createdAt = moment(data.createdAt).format('DD-MM-YYYY')
        return { data, count: data.length, startAt, limit }
    }
}
