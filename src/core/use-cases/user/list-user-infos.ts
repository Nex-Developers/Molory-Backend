import { MissingParamError, ServerError } from "../../../utils/errors"

export default function makeListUserInfos({
    userDb
}: any = {}) {
    if (!userDb) throw new ServerError()
    return async function listUserInfos({
        id,
    }: any = {}) {
        if (!id) throw new MissingParamError('id')
        const data = await userDb.findFirst({
            where: { id }, select: {
                id: true,
                avatar: true,
                firstName: true,
                lastName: true,
                birthDay: true,
                email: true,
                gender: true,
                role: true,
                rating: true,
                createdAt: true,
                // reviewsReceived: true,
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
                signUpMethod: true,
                vehicles: true,
                preferences: {
                    select: {
                        question: {
                            select: {
                                id: true,
                                value: true,
                            }
                        },
                        answer: {
                            select: {
                                id: true,
                                value: true,
                            }
                        }
                    }
                },
                _count: { select: {
                    trips: true,
                    travels: true
                }}
            }
        })
        // if (data.role === 'driver') data.wallet = await walletDb.findFirst({
        //     where: { id: res.userId },
        //     select: {
        //         balance: true,
        //         currency: true
        //     }
        // })
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
                signUpMethod: data.signUpMethod,
                rating: data.rating,
                reviewsReceived: data.reviewsReceived,
                vehicles: data.vehicles,
                preferences: data.preferences,
                createdAt: data.createdAt,
                documents: [
                    {
                        name: "ID Card",
                        reference: data.idCardNumber,
                        urlFront: data.idCardFront,
                        urlBack: data.idCardBack,
                        status: data.idCardStatus,
                        rejectionMessage: data.idCardRejectionMessage,
                    },
                    {
                        name: "Driver License",
                        reference: data.driverLicenseNumber,
                        urlFront: data.driverLicenseFront,
                        urlBack: data.driverLicenseBack,
                        status: data.driverLicenseStatus,
                        rejectionMessage: data.driverLicenseRejectionMessage,
                    }
                ],
                stats: data._count
            }
        }
    }
}
