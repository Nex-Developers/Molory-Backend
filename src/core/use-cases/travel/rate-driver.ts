import { InvalidParamError, MissingParamError, ServerError } from "../../../utils/errors"
import { DbConnection } from "../../../utils/helpers"

export default ({
    saveProfile,
    notifyUser
}: any = {}) => {
    if (!saveProfile || !notifyUser) throw new ServerError()
    return ({
        travelId,
        rating,
        comment
    }) => {
        if (!travelId) throw new MissingParamError("travelId")
        if (!rating && !comment) throw new MissingParamError("rating or comment")
        if (rating && rating > 5 ) throw new InvalidParamError('rating')  
        const prisma = DbConnection.prisma

        return prisma.$transaction( async() => {
            const travel= await prisma.travel.findUnique({ where: { id: travelId }, select: { route: { select: { trip: { select: {id: true, userId: true}}}}}})
            if (!travel) throw new InvalidParamError('travelId')
            const { route } = travel 
            const userId = route.trip.userId
            const tripId = route.trip.id
            const review = await prisma.driverReview.findUnique({ where: { travelId }})
           if(!review) await prisma.driverReview.create({ data: { travelId, tripId, userId, rating, comment}})
           else await prisma.driverReview.update({ where: { travelId}, data: {tripId, userId, rating, comment }})

           if(rating)  {
                const dirverRatings = await prisma.driverReview.findMany({ where: { userId }, select: { rating: true}})
                const passengerRatings = await prisma.passengerReview.findMany({ where: { userId}, select: { rating: true}})
                const ratings = dirverRatings.map(r => r.rating).concat(passengerRatings.map(r => r.rating))
                const sum = ratings.filter(r => r !== null).reduce((acc, rating) => acc + rating, 0)
                const q = ratings.length
                let averageRating
                if(q)  averageRating = sum/q
                await prisma.user.update({ where: {id: userId}, data: { rating: averageRating}})
                saveProfile(userId)
            }
            notifyUser({ id: userId, titleRef: { text: 'notification.rateTravelDriver.title'}, messageRef: { text: 'notification.rateTravelDriver.message'}, cover: null, data: { type: 'travel', id: travelId}, lang: 'fr' })
            const message = { text: "response.edit"}
            return { message }
          
        })
    }
}