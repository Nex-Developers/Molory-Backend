import { MissingParamError } from "../../../utils/errors"
import { DbConnection } from "../../../utils/helpers"

export default function makeListItemInfos() {
    return async ({
        id
    }: any = {}) => {
        const prisma = DbConnection.prisma
        if (!id) throw new MissingParamError('id')

        const res = await prisma.route.findUnique({ 
            where: {
                id
            }, 
            select: {
                id: true,
                departureDate: true,
                departureTime: true,
                distance: true,
                duration: true,
                price: true,
                fees: true,
                principal: true,
                remainingSeats: true,
                stops: {
                    select: {
                        id: true,
                        type: true,
                        principal: true,
                        longitude: true,
                        latitude: true,
                        address: true,
                        town: true
                    }
                },
                trip:{
                    select: {
                        id: true,
                        seats: true,
                        remainingSeats: true,
                        status: true,
                        departureDate: true,
                        departureTime: true,
                        user: {
                            select: {
                                id: true,
                                avatar: true,
                                firstName: true,
                                lastName: true,
                                phoneNumber: true,
                                rating: true,
                                passengerReviews: { select: {
                                    rating: true,
                                    comment: true,
                                    createdAt: true,
                                    updatedAt: true
                                }},
                                driverReviews: { select: {
                                    rating: true,
                                    comment: true,
                                    createdAt: true,
                                    updatedAt: true
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
                                }
                            }
                        },
                        vehicle: {
                            select: {
                                id: true,
                                numberPlate: true,
                                model: true,
                                type: true,
                                color: true
                            }
                        }
                    }
                }, 
            }
        })

        const data = {
            id: res.id,
            remainingSeats: res.remainingSeats,
            departureDate: res.departureDate,
            departureTime: res.departureTime,
            distance: res.distance,
            duration: res.duration,
            price: res.price + res.fees,
            stops: res.stops,
            driver: res.trip.user,
            vehicle: res.trip.vehicle
        }
        return { data }
    } 
}