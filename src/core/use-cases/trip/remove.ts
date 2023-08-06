import { UnauthorizedError } from './../../../utils/errors/unauthorized-error';
import { AlreadyDoneError, MissingParamError, ServerError } from "../../../utils/errors"
import { DbConnection } from "../../../utils/helpers";

export default function makeRemove({
    tripDb,
    notifyUser,
    saveTrip,
    saveTravel
}: any = {}) {
    if (!tripDb || !notifyUser || !saveTrip || !saveTravel) throw new ServerError()
    const getLast48hours = (date: Date) => {
        return new Date(date.getFullYear(), date.getMonth(), date.getDate() - 2, date.getHours(), date.getMinutes());
    }
    return async ({
        id,
        cancelReason
    }: any = {}) => {
        const prisma = DbConnection.prisma
        if (!id) throw new MissingParamError('id')
        if (!cancelReason) throw new MissingParamError('cancelReason')
        return await prisma.$transaction(async () => {
            const { userId, status, departureDate, departureTime, routes, canceledAt } = await prisma.trip.findFirst({
                where: { id },
                select: {
                    userId: true,
                    departureDate: true,
                    departureTime: true,
                    status: true,
                    routes: {
                        select: {
                            id: true,
                            principal: true,
                            price: true,
                            fees: true,
                            travels: {
                                select: {
                                    id: true,
                                    userId: true,
                                    transactions: {
                                        select: {
                                            id: true,
                                            amount: true,
                                            status: true
                                        }
                                    }
                                }
                            }
                        }
                    },
                    canceledAt: true
                }
            })
            if (!status) throw new AlreadyDoneError(canceledAt.toString())
            if (status === 1) throw new UnauthorizedError()
            if (status === 3) {
                await prisma.trip.update({ where: { id }, data: { status: 0, canceledAt: new Date(), cancelReason } })
                // penalities
                const departureDateTime = new Date(departureDate + ' ' + departureTime)
                const delay = getLast48hours(departureDateTime)
                const principal = routes.find(route => route.principal)
                console.log(departureDateTime, delay, new Date())
                if (delay < new Date()) {
                    const sanction = Math.ceil((0.15 * (principal.price + principal.fees))/5) * 5
                    console.log('sanction ', userId, sanction)
                    await prisma.wallet.update({ where: { id: userId }, data: { balance: { decrement:  sanction} } })
                    // Notify the driver
                } else console.log('sanction false')
                const promises = routes.map(async (route) => {
                    const travelsIds = route.travels.map(travel => travel.id)
                    await prisma.travel.updateMany({
                        where: { id: { in: travelsIds } },
                        data: {
                            status: 0,
                            canceledAt: new Date(),
                            cancelReason,
                            canceledBy: 'driver',
                        },
                    })
                    const promises2 = await route.travels.map(async travel => {
                        console.log(travel);
                        const payment  = await prisma.transaction.findFirst({ where: { travelId: travel.id, status: 1}})
                        if (payment.status === 1) {
                            await prisma.transaction.update({ where: {id: payment.id}, data: { status: 0 }})
                            await prisma.transaction.create({ data: { id: payment.id, amount: payment.amount,  type: 'refund', ref: payment.ref, walletId: travel.userId , travelId:  travel.id } })
                            // notify the user
                            notifyUser({ id: travel.userId, titleRef: { text: 'notification.removeTrip.title'}, messageRef: { text: 'notification.removeTrip.message'}, cover: null,  data: { path: 'cancel-trip', id: id.toString(), res:'INFOS'}, lang: 'fr', type: 'trip' })
                            saveTravel(travel.id)
                        }
                        return true
                    });
                    return Promise.all(promises2).then(() => true)
                })
                return Promise.all(promises).then(() => {
                    saveTrip(id)
                    const message = { text: 'response.remove' }
                    return { message }
                })
            }
            if (status === 2) {
                // incident
                // Remettre l'argent au passager?
                const message = { text: 'response.remove' }
                return { message }
            }
            else {
                // unknown status
                const message = { text: 'response.remove' }
                return { message }
            }
        })
    }
}