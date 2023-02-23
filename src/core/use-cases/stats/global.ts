import { DbConnection } from "../../../utils/helpers"

export default () => {
    const getLastDaysDate = (num) => {
        const now = new Date()
        return new Date(now.getFullYear(), now.getMonth(), now.getDate() - num, now.getHours(), now.getMinutes());

    }
    return async () => {
        const prisma = DbConnection.prisma

        const tripCount = await prisma.trip.count({ where: { status: { gte: 1 } } })
        const travelCount = await prisma.travel.count({ where: { status: { gte: 1 } } })
        const userCount = await prisma.user.count()

        const monthTripCount = await prisma.trip.count({ where: { createdAt: { gte: getLastDaysDate(30) } } })
        const monthTravelCount = await prisma.travel.count({ where: { createdAt: { gte: getLastDaysDate(30) } } })
        const monthUserCount = await prisma.user.count({ where: { createdAt: { gte: getLastDaysDate(30) } } })

        return {
            tripCount,
            travelCount,
            userCount,
            monthTripCount,
            monthTravelCount,
            monthUserCount
        }
    }
}