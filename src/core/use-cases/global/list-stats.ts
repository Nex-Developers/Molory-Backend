import { DbConnection } from "../../../utils/helpers"

export function makeListStats () {
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

        const transactions = await prisma.transaction.findMany({ where: { status: 1, type: 'payment'}})

        const incomes = transactions.reduce((a,b) => a + b.amount, 0)
        const deposits = await prisma.transaction.findMany({ where: { status: 1, type: 'deposit'}})
        const withdraws = await prisma.transaction.findMany({ where: { status: 1, type: 'withdraw'}})

        const payout = withdraws.reduce((a,b) => a + b.amount, 0)
        const payin = deposits.reduce((a,b) => a + b.amount, 0)


        return {
            tripCount,
            travelCount,
            userCount,
            monthTripCount,
            monthTravelCount,
            monthUserCount,
            incomes,
            payout,
            payin
        }
    }
}