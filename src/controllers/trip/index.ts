import { addTrip, confirmTrip, listTripInfos, listTrips, removeTrip } from "../../core/use-cases/trip"
import makeDeleteController from "./delete"
import makeGetItemController from "./get-item"
import makeGetItemsController from "./get-items"
import makePatchConfirmController from "./patch-confirm"
import makePostController from "./post"


const getTripsController = makeGetItemsController({ listTrips })
const getTripController = makeGetItemController({ listTripInfos })
const postTripController = makePostController({ addTrip })
const patchTripConfirmController = makePatchConfirmController({ confirmTrip })
const deleteTripController = makeDeleteController({ removeTrip })

export {
    getTripsController,
    getTripController,
    postTripController,
    patchTripConfirmController,
    deleteTripController
}
