import { MissingParamError, ServerError } from "../../../utils/errors"

export default function makeListItemInfos({
    tripDb
}: any = {}) {
    if (!tripDb) throw new ServerError()
    const orderPreferences = (data: any[]) => {
        return data.sort((a, b) => a.question.id - b.question.id)
    }
    return async ({
        id
    }: any = {}) => {
        if (!id) throw new MissingParamError('id')

        const res = await tripDb.findFirst({
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
                        principal: true,
                        stops: true,
                        travels: {
                            select: {
                                seats: true,
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
                                status: true,
                                createdAt: true,
                                user: {
                                    select: {
                                        id: true,
                                        avatar: true,
                                        firstName: true,
                                        lastName: true,
                                        phoneNumber: true,
                                        passengerReviews: true,
                                        driverReviews: true,
                                        preferences: true
                                    }
                                },

                            }
                        }
                    }
                },
                createdAt: true
            }
        })

        const passengers = []
        const route = res.routes.find(route => route.principal)
       const promises = res.routes.map(async  item => {
            const route = {
                id: item.id,
                distance: item.distance,
                duration: item.duration,
                price: item.price,
                fees: item.fees,
                stops: item.stops,
            }
            const promises = item.travels.map( booking =>{
                const allReviews: any[] = booking.user.passengerReviews.concat(booking.user.driverReviews)
                const reviews = allReviews.sort((a, b) =>  b.createdAt - a.createdAt)
                delete booking.user.driverReviews
                delete booking.user.passengerReviews
                booking.user.preferences = orderPreferences(booking.user.preferences)
                const user = { ...booking.user, reviews}
                const travel = { route, seats: booking.seats,
                     passengerReview: booking.passengerReview,
                      driverReview: booking.driverReview,
                      status: booking.status,
                      createdAt: booking.createdAt
                    }
               return  passengers.push({ user, travel})
            })
            return await  Promise.all(promises)
        })
        await Promise.all(promises)
        delete route.travels
        const data = {
            id: res.id,
            seats: res.seats,
            remainingSeats: res.seats,
            status: res.status,
            departureDate: res.departureDate,
            departureTime: res.departuereTime,
            description: res.description,
            user: res.user,
            route,
            vehicle: res.vehicle,
            passengers
        }
        return { data }
    }
}
