import { ServerError } from "../../../utils/errors"

export default function makeListItems({
    travelDb
}: any = {}) {
    if (!travelDb) throw new ServerError()
    return async ({
        userId,
        startAt,
        limit
    }: any = {}) => {
        if (!startAt) startAt = 0
        if (!limit) limit = 100
        const where: any = {}
        if (userId) where.userId = userId
        const res = await travelDb.findMany({
            startAt,
            limit,
            where,
            orderBy: {
                id: 'desc'
            },
            select: {
                id: true,
                seats: true,
                status: true,
                description: true,

                route: {
                    select: {
                        id: true,
                        price: true,
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
                                user: {
                                    select: {
                                        id: true,
                                        avatar: true,
                                        firstName: true,
                                        lastName: true,
                                        phoneNumber: true,
                                        rating: true
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
                user: {
                    select: {
                        id: true,
                        avatar: true,
                        firstName: true,
                        lastName: true,
                        phoneNumber: true
                    }
                },
                createdAt: true
            }
        })
        const data = [];
        res.forEach(item => {
            const { trip, ...route } = item.route
            const { user, vehicle, ..._trip } = trip
            data.push({
                id: item.id,
                seats: item.seats,
                status: item.status,
                description: item.description,
                createdAt: item.createdAt,
                route,
                trip: _trip,
                driver: user,
                vehicle,
                user: item.user
            })
        })



        return { data }
    }
}