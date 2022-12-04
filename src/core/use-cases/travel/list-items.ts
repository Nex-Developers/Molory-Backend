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
        const where: any = { status: { lt: 4 } }
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
                                        phoneNumber: true
                                    }
                                }
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

        const  { route,  _trip} = res.route
        const { trip, user} = _trip
        const data = {
            id: res.id,
            seats: res.seats,
            status: res.status,
            createdAt: res.createdAt,
            route,
            trip,
            driver: user,
            user: res.user
        }
        return { data }
    }
}