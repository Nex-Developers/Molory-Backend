import { InvalidParamError, ServerError } from "../../../utils/errors"

export default function makeRateUser({
    userDb
}) {
    if (!userDb) throw new ServerError()
    return async (
        {
            // userId,
            // doneBy,
            rating,
            // review
        }
    ) => {
        if (rating < 0 || rating > 5) throw new InvalidParamError('rating')
        // await reviewDb.insertOne({ data: { userId, rating, review, doneBy }})
        // const ratings = await reviewDb.findMany({ where: { userId }, select: { rating }})
        // const formatedRatings = ratings.map(rating => rating.value).filter( item => item !== undefined || item !== null)
        // const average =  formatedRatings.reduce((a,b) => a + b)/formatedRatings.length
        // const fixedAverage = parseFloat(average.toString()).toFixed(1)
       // reduce the average before save
        // await userDb.update({ where: { id: userId}, data: { rating: fixedAverage }})
        const message = { text: "response.add"}
        return { message, rating }
    }
}
