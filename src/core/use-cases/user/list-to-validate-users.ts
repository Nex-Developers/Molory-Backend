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
        const data = await userDb.findMany({ startAt, limit, where: { OR: [{ driverLicenseStatus: 2 }, { idCardStatus: 2 }]}, select:{
            id: true,
            avatar: true,
            lastName: true,
            firstName: true,
            phoneNumber: true,
            email: true,
            birthDay: true,
            role: true,
            createdAt: true,
            blockedAt: true,
            idCardFront: true,
            idCardBack: true,
            idCardStatus: true,
            idCardRejectionMessage: true,
            idCardModifiedAt: true,
            driverLicenseFront: true,
            driverLicenseBack: true,
            driverLicenseStatus: true,
            driverLicenseRejectionMessage: true,
            driverLicenseModifiedAt: true
        }})
        return { data, count: data.length, startAt, limit }
    }
}
