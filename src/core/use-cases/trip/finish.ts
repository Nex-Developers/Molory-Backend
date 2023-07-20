import { AlreadyDoneError, ServerError, UnauthorizedError } from "../../../utils/errors"
import { DbConnection } from "../../../utils/helpers"

export default ({
    notifyUser,
    saveTrip,
    saveProfile,
    saveTravel
}) => {
    if (!notifyUser || !saveTrip || !saveTravel) throw new ServerError()
    return async ({
        id
    }) => {
        const prisma = DbConnection.prisma
        return await prisma.$transaction( async () => {
            console.log(' Finish trip', + id)
            const {  userId, status, startedAt, departureAddress, arrivalAddress, departureDate, departureTime, routes, promotionId } = await prisma.trip.findUnique({ where: { id }, select: { userId: true, status: true, startedAt: true, departureAddress: true, arrivalAddress: true, departureDate: true, departureTime: true,  promotionId: true, routes: { select: { id: true, fees: true, price: true, travels: { select: { id: true, userId: true, seats: true, status: true}}}} }})
            if (status === 0) throw new UnauthorizedError()
            if (status === 1) throw new AlreadyDoneError(startedAt.toString())
            await prisma.trip.update({ where: { id }, data: { status: 1, finishedAt: new Date() }})
            // await prisma.travel.updateMany({ where: { route: { tripId: id }, status: { gt: 1 }}, data: { status: 1 }})
            // const payments = await prisma.payment.findMany({ where: {  tripId: id , status: 1  }, select: { amount: true }})

            // const total = payments.reduce((total, payment) => total + payment.amount, 0)
            
            let incomes = 0, commission = 0
          
           const promises =  routes.map( async route => {
                const promises2 = route.travels.map(  travel => {
                  if(travel.status == 2 || travel.status == 1)   {
                    incomes += route.price * travel.seats 
                    commission += route.fees * travel.seats
                  }
                })
                return await Promise.all(promises2)
            })
            await Promise.all(promises)
            if (promotionId) {
                const { discount } = await prisma.promotion.findUnique({ where: { id: promotionId}})
                commission -= commission*discount
                incomes += incomes*discount
            } 
            // notifyAdmin
         
            if (incomes) {
            // await prisma.transaction.create({ data: { tripId: id, walletId: userId, amount: incomes, commission }})
            await prisma.wallet.update({ where: { id: userId }, data: { balance: { increment: incomes }}})
           }
           console.log(`------> Trip ${id} finished with incomes for the driver of ${incomes} and a commission for the company of ${commission}.`)
            // notify driver that his trip is finished and his money is provided
            notifyUser({ id: userId, titleRef: { text: 'notification.finishTrip.title'}, messageRef: { text: 'notification.finishTrip.message', params: { departure: departureAddress, arrival: arrivalAddress, date: departureDate, time: departureTime}}, cover: null,  data: { path: 'end-trip', id: id.toString(), res:'INFOS'}, lang: 'fr', type: 'trip' })
            // xxxxx notify passengers the trip is finished and they are allowed to rate the driver
            routes.forEach(route => route.travels.forEach(({id, status}) => {
             if(status == 2) {
                // notifyUser({ id: userId, titleRef: { text: 'notification.finishTravel.title'}, messageRef: { text: 'notification.finishTravel.message'}, cover: null, data: { type: 'travel', id}, lang: 'fr' })
                saveTravel(id)
            }
            }))     
            saveTrip(id)
            saveProfile(userId)       // add finish task
            const message = { text: "response.edit" }
            return { message }
        })
    }
}