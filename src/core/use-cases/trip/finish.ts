import { AlreadyDoneError, ServerError, UnauthorizedError } from "../../../utils/errors"
import { DbConnection } from "../../../utils/helpers"

export default ({
    notifyUser,
    saveTrip,
    saveTravel
}) => {
    if (!notifyUser || !saveTrip || !saveTravel) throw new ServerError()
    return async ({
        id
    }) => {
        const prisma = DbConnection.prisma
        return await prisma.$transaction( async () => {
            console.log(' Finish trip', + id)
            const {  userId, status, startedAt, routes } = await prisma.trip.findUnique({ where: { id }, select: { userId: true, status: true, startedAt: true, routes: { select: { id: true, fees: true, price: true, travels: { select: { id: true, userId: true, seats: true, status: true}}}} }})
            if (status === 0) throw new UnauthorizedError()
            if (status === 1) throw new AlreadyDoneError(startedAt.toString())
            await prisma.trip.update({ where: { id }, data: { status: 1, finishedAt: new Date() }})
            await prisma.travel.updateMany({ where: { route: { tripId: id }, status: { gt: 1 }}, data: { status: 1 }})
            // const payments = await prisma.payment.findMany({ where: {  tripId: id , status: 1  }, select: { amount: true }})

            // const total = payments.reduce((total, payment) => total + payment.amount, 0)
            
            let incomes, commission = 0
           const promises =  routes.map( async route => {
                const promises2 = route.travels.map(  travel => {
                  if(travel.status == 2)  {
                    incomes += route.price * travel.seats
                    commission += route.fees * travel.seats
                  }
                })
                return await Promise.all(promises2)
            })
            await Promise.all(promises)
            // notifyAdmin
            console.log(`------> Trip ${id} finished with incomes for the driver of ${incomes} and a commission for the company of ${commission}`)
            await prisma.transfer.create({ data: { tripId: id, userId, amount: incomes, commission }})
            await prisma.wallet.update({ where: { id: userId }, data: { balance: { increment: incomes }}})
            // notify driver that his trip is finished and his money is provided
            notifyUser({ id: userId, titleRef: { text: 'notification.finishTrip.title'}, messageRef: { text: 'notification.finishTrip.message'}, cover: null, data: { type: 'trip', id}, lang: 'fr' })
            // xxxxx notify passengers the trip is finished and they are allowed to rate the driver
            routes.forEach(route => route.travels.forEach(({id,  userId, status}) => {
             if(status == 2) {
                notifyUser({ id: userId, titleRef: { text: 'notification.finishTravel.title'}, messageRef: { text: 'notification.finishTravel.message'}, cover: null, data: { type: 'travel', id}, lang: 'fr' })
                saveTravel(id)
            }
            }))     
            saveTrip(id)       // add finish task
            const message = { text: "response.edit" }
            return { message }
        })
    }
}