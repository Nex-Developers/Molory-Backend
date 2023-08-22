import { UnauthorizedError } from './../../../utils/errors/unauthorized-error';
import { AlreadyDoneError, MissingParamError, ServerError } from "../../../utils/errors"
import { DbConnection } from "../../../utils/helpers";
import { v4 } from 'uuid'
import { saveProfile } from '../../services/firebase';

export default function makeRemove({
    tripDb,
    notifyUser,
    saveTrip,
    saveTravel
}: any = {}) {
    if (!tripDb || !notifyUser || !saveTrip || !saveTravel) throw new ServerError()
    const reformateDate = (date: string) => {
        return date.split("-").reverse().join("-")
    }

    const getLast48hours = (date: Date) => {
        const maintenant = new Date();
        const differenceEnMillisecondes = date.getTime() - maintenant.getTime();
        const differenceEnHeures = differenceEnMillisecondes / (1000 * 60 * 60);
        return differenceEnHeures < 48;
    }

    return async ({
        id, cancelReason
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
                            departureAddress: true,
                            arrivalAddress: true,
                            commission: true,
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
                const departureDateTime = new Date(reformateDate(departureDate) + ' ' + departureTime)
                const delay = getLast48hours(new Date(departureDateTime))
                const principal = routes.find(route => route.principal)
                console.log(departureDateTime, delay, new Date())
                let sanctionAmount = 0
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
                        const payment = await prisma.transaction.findFirst({ where: { travelId: travel.id, status: 1 } })
                        console.log('payment ', payment)
                        if (payment && payment.status === 1) {
                            await prisma.transaction.update({ where: { id: payment.id }, data: { status: 0 } })
                            // console.log(delay, new Date())
                            if (delay) {
                                const sanction = Math.ceil((0.05 * principal.price) / 5) * 5
                                sanctionAmount+=sanction
                                console.log('sanction ', userId, sanction)
                                const transactionId = v4()
                                await prisma.wallet.update({ where: { id: userId }, data: { balance: { decrement: sanction } } })
                                await prisma.transaction.create({ data: { id: transactionId, amount: payment.amount, type: 'refund', ref: transactionId, walletId: travel.userId, status: 1 } })
                                // Notify the driver
                            } else console.log('sanction false')
                            const transactionId = v4()
                            await prisma.wallet.update({ where: { id: travel.userId }, data: { balance: { increment: (principal.price + principal.commission + principal.fees) } } })
                            await prisma.transaction.create({ data: { id: transactionId, amount: payment.amount, type: 'refund', ref: transactionId, walletId: travel.userId, status: 1 } })
                            // notify the user
                            notifyUser({ id: travel.userId, titleRef: { text: 'notification.removeTravel.title'}, messageRef: { text: 'notification.removeTravel.message', params: { departure: route.departureAddress, arrival: route.arrivalAddress, date: departureDate, time: departureTime} }, cover: null, data: { path: 'cancel-trip', id: id.toString(), res: 'INFOS' }, lang: 'fr', type: 'trip' })
                            saveTravel(travel.id)
                            saveProfile(travel.userId)
                        }
                        return true
                    });
                    return Promise.all(promises2).then(() => true)
                })
                return Promise.all(promises).then(() => {
                    saveTrip(id)
                    saveProfile(userId)
                    const text = sanctionAmount===0?'notification.cancelTrip.message':'notification.cancelTrip.messageWithSanction'
                    notifyUser({ id: userId, titleRef: { text: 'notification.cancelTrip.title' }, messageRef: { text, params: { sanction: sanctionAmount,  departure: principal.departureAddress, arrival: principal.arrivalAddress, date: departureDate, time: departureTime} }, cover: null, data: { path: 'cancel-trip', id: id.toString(), res: 'INFOS' }, lang: 'fr', type: 'trip' })
                    const message = { text: 'response.remove' }
                    return { message }
                })
            }
            if (status === 2) {
                // incident
                // Remettre l'argent au passager?
                const message = { text: 'response.remove' }
                return { message }
            } else {
                // unknown status
                const message = { text: 'response.remove' }
                return { message }
            }
        })
    }
}
