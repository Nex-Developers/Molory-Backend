import { addTrip, confirmTrip, listTripInfos, listTrips } from "../../core/use-cases/trip"
import makeGetItemController from "./get-item"
import makeGetItemsController from "./get-items"
import makePatchConfirmController from "./patch-confirm"
import makePostController from "./post"


const getTripsController = makeGetItemsController({ listTrips })
const getTripController = makeGetItemController({ listTripInfos })
const postTripController = makePostController({ addTrip })
const patchTripConfirmController = makePatchConfirmController({ confirmTrip })


export {
    getTripsController,
    getTripController,
    postTripController,
    patchTripConfirmController
}
