import { ServerError } from "../../../utils/errors"

export default function makeListToValidateUsers({
    userDb
}: any = {}) {
    if (!userDb) throw new ServerError()
    return async function ({
        startAt,
        limit
    }: any ={}) {
        if (!startAt) startAt = 0
        if (!limit) limit = 100
        const data = await userDb.findMany({ startAt, limit, where: { OR: [{ diverLicenseStatus: 2 }, { idCardStatus: 2 }], select:{
            id: true,
            avatar: true,
            lastName: true,
            firstName: true,
            phoneNumber: true,
            email: true,
            birthDay: true,
            createdAt: true,
            blockedAt: true,
            driverLicense: true,
            idCard: true,
            role: true
        }})
        return { data, count: data.length, startAt, limit }
    }
}
