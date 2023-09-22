import { ServerError } from './../../../utils/errors/server-error';
import { DbConnection } from "../../../utils/helpers"

export default function makeSaveNotification({
    setInCollection
}: any = {}) {
    if (!setInCollection) throw new ServerError()

    return async (id: number) => {
        const prisma = DbConnection.prisma
        const res = await prisma.trip.findUnique({
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
                promotion: true,
                // driverReviews: true,
                // passengerReviews: true,
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
                        commission: true,
                        principal: true,
                        departureDate: true,
                        departureTime: true,
                        stops: true,
                        travels: {
                            select: {
                                id: true,
                                seats: true,
                                passengerReview: {
                                    select: {
                                        rating: true,
                                        comment: true,
                                        createdAt: true,
                                        updatedAt: true,
                                        by: true
                                    }
                                },
                                driverReview: {
                                    select: {
                                        rating: true,
                                        comment: true,
                                        createdAt: true,
                                        updatedAt: true,
                                        by: true
                                    }
                                },
                                status: true,
                                createdAt: true,
                                deletedAt: true,
                                canceledAt: true,
                                user: {
                                    select: {
                                        id: true,
                                        avatar: true,
                                        firstName: true,
                                        lastName: true
                                    }
                                },

                            }
                        }
                    }
                },
                createdAt: true,
                reports: {
                    select: {
                        id: true,
                        description: true,
                        createdAt: true,
                        interrupted: true,
                    }
                }
            }
        })
        const passengers = []
        const route = res.routes.find(route => route.principal)
        const promises = res.routes.map(async item => {
            const route = {
                id: item.id,
                distance: item.distance,
                duration: item.duration,
                departureDate: item.departureDate,
                departureTime: item.departureTime,
                price: item.price,
                fees: item.fees,
                commission: item.commission,
                stops: item.stops,
            }
            const promises = item.travels.map(booking => {
                if (booking.canceledAt) return null;
                const user = booking.user
                const travel = {    
                    id: booking.id, route, seats: booking.seats,
                    passengerReview: booking.passengerReview,
                    driverReview: booking.driverReview,
                    status: booking.status,
                    createdAt: booking.createdAt
                }
                return passengers.push({ user, travel })
            })
            return await Promise.all(promises)
        })
        await Promise.all(promises)
        delete route.travels
        const data = {
            id: res.id,
            seats: res.seats,
            remainingSeats: res.remainingSeats,
            status: res.status,
            departureDate: res.departureDate,
            departureTime: res.departureTime,
            description: res.description,
            route,
            vehicle: res.vehicle,
            passengers,
            reports: res.reports,
            promotion: res.promotion
        }
        return await setInCollection('users', res.user.id.toString(), 'trips', id.toString(), data)

    }
}
