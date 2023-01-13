import { InvalidParamError, MissingParamError, ServerError } from "../../../utils/errors"
import { DbConnection } from "../../../utils/helpers"

export default  ({
    saveProfile
}: any = {}) => {
    if (!saveProfile) throw new ServerError()
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
            const {userId, route } = await prisma.travel.findUnique({ where: { id: travelId }, select: { userId: true,  route: { select: { tripId: true } }}})
            const tripId = route.tripId
            const review = await prisma.passengerReview.findUnique({ where: { travelId }})
            if(!review) await prisma.passengerReview.create({ data: { travelId, tripId, userId, rating, comment}})
            else await prisma.passengerReview.update({ where: { travelId}, data: {tripId, userId, rating, comment }})

            if(rating !== null && rating !== undefined) {
                const dirverRatings = await prisma.driverReview.findMany({ where: { userId }, select: { rating: true}})
                const passengerRatings = await prisma.passengerReview.findMany({ where: { userId}, select: { rating: true}})
                const ratings = dirverRatings.map(r => r.rating).concat(passengerRatings.map(r => r.rating))
                const sum = ratings.reduce((acc, rating) => acc + rating, 0)
                const q = ratings.length
                let averageRating
                if(q)  averageRating = sum/q
                await prisma.user.update({ where: {id: userId}, data: { rating: averageRating}})
                // saveProfile(userId)
            }

            const message = { text: "response.edit"}
            return { message }
          
        })
    }
}