import { MissingParamError, ServerError } from "../../../utils/errors"

export default function makeListItemInfos({
    tripDb
}: any = {}) {
    if (!tripDb) throw new ServerError()
    return async ({
        id
    }: any = {}) => {
        if (!id) throw new MissingParamError('id')

        const data = await tripDb.findFirst({
            where: {
                id
            },
            select: {
                id: true,
                seats: true,
                remainingSeats: true,
                status: true,
                departureDate: true,
                departureTime: true,
                description: true,
                user: {
                    select: {
                        id: true,
                        avatar: true,
                        firstName: true,
                        lastName: true,
                        phoneNumber: true
                    }
                },
                vehicle: {
                    select: {
                        id: true,
                        type: true,
                        model: true,
                        color: true,
                        numberPlate: true,
                        registrationDoc: true
                    }
                },
                routes: {
                    select: {
                        id: true,
                        distance: true,
                        duration: true,
                        price: true,
                        fees: true,
                        stops: true,
                        travels: {
                            select: {
                                seats: true,
                                status: true,
                                createdAt: true,
                                user: {
                                    select: {
                                        id: true,
                                        avatar: true,
                                        firstName: true,
                                        lastName: true,
                                        phoneNumber: true
                                    }
                                },

                            }
                        }
                    }
                },
                createdAt: true
            }
        })
        return { data }
    }
}