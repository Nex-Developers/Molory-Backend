import { addTrip, confirmTrip, listTrips } from "../../core/use-cases/trip"
import makeGetItemsController from "./get-items"
import makePatchConfirmController from "./patch-confirm"
import makePostController from "./post"


const getTripsController = makeGetItemsController({ listTrips })
const postTripController = makePostController({ addTrip })
const patchTripConfirmController = makePatchConfirmController({ confirmTrip })


export {
    getTripsController,
    postTripController,
    patchTripConfirmController
}
