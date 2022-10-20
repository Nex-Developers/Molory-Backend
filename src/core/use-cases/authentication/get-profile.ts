import { ServerError, InvalidParamError } from "../../../utils/errors"

export default function makeGetProfile({
    userDb
}: any = {}) {
    if (!userDb) throw new ServerError()
    return async function getProfile({
        id
    }: any = {}) {
        if (!id) throw new InvalidParamError('token')
        const data = await userDb.findFirst({
            where: { id },
            select: {
                avatar: true,
                firstName: true,
                lastName: true,
                birthDay: true,
                email: true,
                gender: true,
                role: true,
                rating: true,
                reviewsReceived: true,
                phoneNumber: true,
                profileCompletedAt: true,
                idCardFront: true,
                idCardBack: true,
                idCardStatus: true,
                idCardNumber: true,
                idCardRejectionMessage: true,
                idCardModifiedAt: true,
                driverLicenseFront: true,
                driverLicenseBack: true,
                driverLicenseStatus: true,
                driverLicenseNumber: true,
                driverLicenseRejectionMessage: true,
                driverLicenseModifiedAt: true,
                vehicles: true,
                preferences: {
                    select: {
                        id: true,
                        question: true,
                        answer: true
                    }
                },
                _count: {
                    select: {
                        trips: true,
                        travels: true
                    }
                }
            }
        })

        const documents = [];
        if (data.idCardFront || data.idCardBack) {
            documents.push({
                name: "ID Card",
                reference: data.idCardNumber,
                urlFront: data.idCardFront,
                urlBack: data.idCardBack,
                status: data.idCardStatus,
                rejectionMessage: data.idCardRejectionMessage,
            })
        }
        if (data.driverLicenseFront || data.driverLicenseBack) {
            documents.push({
                name: "Driver License",
                reference: data.driverLicenseNumber,
                urlFront: data.driverLicenseFront,
                urlBack: data.driverLicenseBack,
                status: data.driverLicenseStatus,
                rejectionMessage: data.driverLicenseRejectionMessage,
            })
        }
        return {
            data: {
                avatar: data.avatar,
                firstName: data.firstName,
                lastName: data.lastName,
                birthDay: data.birthDay,
                email: data.email,
                gender: data.gender,
                role: data.role,
                phoneNumber: data.phoneNumber,
                profileCompletedAt: data.profileCompletedAt,
                rating: data.rating,
                reviewsReceived: data.reviewsReceived,
                preferences: data.preferences,
                vehicles: data.vehicles,
                documents,
                stats: data._count
            }
        }
    }
}