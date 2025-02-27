import { MissingParamError } from './../../../utils/errors/missing-param-error';
import { ServerError } from "../../../utils/errors"
import { DbConnection } from '../../../utils/helpers';
import moment from 'moment';

export default function makeSaveProfile({
    set
}: any = {}) {
    if (!set) throw new ServerError()
    return async (id) => {
        const prisma = DbConnection.prisma
        if (!id) throw new MissingParamError(id)
        const res = await prisma.user.findUnique({
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
                passengerReviews: { select: {
                    rating: true,
                    comment: true,
                    createdAt: true,
                    updatedAt: true,
                    by: true
                }},
                driverReviews: { select: {
                    rating: true,
                    comment: true,
                    createdAt: true,
                    updatedAt: true,
                    by: true
                }},
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
                                index: true,
                                value: true,
                            }
                        }
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
        if (res.idCardFront || res.idCardBack) {
            documents.push({
                name: "ID Card",
                reference: res.idCardNumber,
                urlFront: res.idCardFront,
                urlBack: res.idCardBack,
                status: res.idCardStatus,
                rejectionMessage: res.idCardRejectionMessage,
            })
        }
        if (res.driverLicenseFront || res.driverLicenseBack) {
            documents.push({
                name: "Driver License",
                reference: res.driverLicenseNumber,
                urlFront: res.driverLicenseFront,
                urlBack: res.driverLicenseBack,
                status: res.driverLicenseStatus,
                rejectionMessage: res.driverLicenseRejectionMessage,
            })
        }
        const allReviews: any[] = res.passengerReviews.concat(res.driverReviews)
        const reviews = allReviews.sort((a, b) =>  b.createdAt - a.createdAt)
        const data: any = {
            id,
            avatar: res.avatar,
            firstName: res.firstName,
            lastName: res.lastName,
            birthDay: moment(res.birthDay).format('DD-MM-YYYY'),
            email: res.email,
            gender: res.gender,
            role: res.role,
            phoneNumber: res.phoneNumber,
            profileCompletedAt: res.profileCompletedAt,
            signUpMethod: res.signUpMethod,
            rating: res.rating,
            preferences: res.preferences,
            vehicles: res.vehicles,
            documents,
            stats: res._count,
            reviews
        }
       data.wallet = await prisma.wallet.findUnique({
            where: { id },
            select: {
                balance: true,
                currency: true
            }
        })
        return await set('users', id.toString(), data)
    }
}
