import { ServerError } from './../../../utils/errors/server-error';
import { DbConnection } from "../../../utils/helpers"

export default function makeSaveNotification({
    setInCollection
}: any = {}){
    if (!setInCollection) throw new ServerError()

    const orderPreferences = (data: any[]) => {
        return data.sort((a, b) => a.question.id - b.question.id)
    }

    return  async (id: number) => {
        const prisma = DbConnection.prisma
        const travel: any = await prisma.travel.findUnique({ where: { id }, 
            select: {
                id: true,
                seats: true,
                status: true,
                description: true,
                passengerReview: { select: {
                    rating: true,
                    comment: true,
                    createdAt: true,
                  updatedAt: true
                }},
                driverReview: { select: {
                    rating: true,
                    comment: true,
                    createdAt: true,
                  updatedAt: true
                }},
                route: {
                    select: {
                        id: true,
                        price: true,
                        fees: true,
                        commission: true,
                        distance: true,
                        duration: true,
                        departureDate: true,
                        departureTime: true,
                        stops: true,
                        trip: {
                            select: {
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
                                        phoneNumber: true,
                                        rating: true,
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
                                    }
                                }, vehicle: {
                                    select: {
                                        id: true,
                                        numberPlate: true,
                                        model: true,
                                        type: true,
                                        color: true
                                    }
                                },
                            }
                        }
                    }
                },
                transactions: true,
                user: {
                    select: {
                        id: true,
                        avatar: true,
                        firstName: true,
                        lastName: true,
                        phoneNumber: true,
                    }
                },
                createdAt: true,
                reports: {
                    select: {
                        id: true,
                        description: true,
                        createdAt: true,
                        interrupted: true,
                        user: { 
                            select: {
                                id: true,
                                avatar: true,
                                firstName: true,
                                lastName: true,
                                phoneNumber: true,
                            }
                        }
                    }
                },
                promotion: true,
            }
        })
        const { trip, ...route } = travel.route
        const { user, vehicle, ..._trip }: any = trip
        const allReviews: any[] = user.passengerReviews.concat(user.driverReviews)
        user.reviews = allReviews.sort((a, b) =>  b.createdAt - a.createdAt)
        user.preferences =  orderPreferences(user.preferences)
        // route.price += route.fees
        // delete route.fees
        delete user.driverReviews
        delete user.passengerReviews

       const  data ={
            id,
            seats: travel.seats,
            status: travel.status,
            description: travel.description,
            createdAt: travel.createdAt,
            passengerReview: travel.passengerReview,
            driverReview: travel.driverReview,
            route,
            trip: _trip,
            driver: user,
            user: travel.user,
            vehicle,
            transactions: travel.transactions,
            reports: travel.reports,
            promotion: travel.promotion
        }
        return await setInCollection('users', travel.user.id.toString(), 'travels', id.toString() , data)
    }
}