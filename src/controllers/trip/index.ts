import { addTrip, editTrip, finishTrip, listTripInfos, listTrips, removeTrip, startTrip, tripReport } from "../../core/use-cases/trip"
import makeDeleteController from "./delete"
import makeGetItemController from "./get-item"
import makeGetItemsController from "./get-items"
import makePatchController from "./patch"
import makePatchStartController from "./patch-start"
import makePatchFinishController from "./patch-finish"
import makePostController from "./post"
import makePostTripReportController from "./post-trip-report"


const getTripsController = makeGetItemsController({ listTrips })
const getTripController = makeGetItemController({ listTripInfos })
const postTripController = makePostController({ addTrip })
const patchTripController = makePatchController({ editTrip })
const deleteTripController = makeDeleteController({ removeTrip })
const patchStartTripController = makePatchStartController({ startTrip })
const patchFinishController = makePatchFinishController({ finishTrip })
const postTripReportController = makePostTripReportController({ tripReport })  

export {
    getTripsController,
    getTripController,
    postTripController,
    patchTripController,
    deleteTripController,
    patchStartTripController,
    patchFinishController,
    postTripReportController
}
