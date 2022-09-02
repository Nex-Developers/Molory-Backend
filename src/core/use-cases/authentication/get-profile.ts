import { ServerError, InvalidParamError } from "../../../utils/errors"

export default function makeGetProfile ({
    userDb
}: any = {}) {
    if (!userDb) throw new ServerError()
    return async function getProfile({
       id
    }: any = {}) {
        if (! id ) throw new InvalidParamError('token')
        const data = await userDb.findFirst({
            where: { id }, 
            select: { 
                avatar: true,
                firstName: true,
                lastName: true,
                birthDay: true,
                email: true,
                role: true,
                rating: true,
                reviewsReceived: true,
                phoneNumber: true,
                profileCompletedAt: true,
                idCardFront: true,
                idCardBack: true,
                idCardStatus: true,
                idCardRejectionMessage: true,
                idCardModifiedAt: true,
                driverLicenseFront: true,
                driverLicenseBack: true,
                driverLicenseStatus: true,
                driverLicenseRejectionMessage: true,
                driverLicenseModifiedAt: true,
                configurations: {
                    select: {
                        value: true,
                        createdAt: true,
                        updatedAt: true,
                        preference: true
                    }
                },
            }
            })
        return { data: {
            avatar: data.avatar,
            firstName: data.firstName,
            lastName: data.lastName,
            birthDay: data.birthDay,
            email: data.email,
            role: data.role,
            phoneNumber: data.phoneNumber,
            profileCompletedAt: data.profileCompletedAt,
            rating: data.rating,
            reviewsReceived: data.reviewsReceived,
           
            documents: [
                {
                    name: "ID Card",
                    urlFront: data.idCardFront,
                    urlBack: data.idCardBack,
                    status: data.idCardStatus,
                    rejectionMessage: data.idCardRejectionMessage,
                },
                {
                    name: "Driver License",
                    urlFront: data.driverLicenseFront,
                    urlBack: data.driverLicenseBack,
                    status: data.driverLicenseStatus,
                    rejectionMessage: data.driverLicenseRejectionMessage,
                }
            ]
        } }
    }
}