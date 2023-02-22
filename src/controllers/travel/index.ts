import { addTravel, askToEnd, askToStart, confirmEnd, confirmPayment, confirmStart, editTravel, listTravelInfos, listTravels, rateDriver, ratePassenger, removeTravel, selfConfirmEnd, travelReport } from "../../core/use-cases/travel"

import makeDeleteController from "./delete"
import makeGetItemController from "./get-item"
import makeGetItemsController from "./get-items"
import makePatchController from "./patch"
import makePostController from "./post"
import makePostAskToEndController from "./post-ask-to-end"
import makePostAskToStartController from "./post-ask-to-start"
import makePostConfirmEndedController from "./post-confirm-ended"
import makePostConfirmStartedController from "./post-confirm-started"
import makePostNotifyController from "./post-notify"
import makePostRateDriverController from "./post-rate-driver"
import makePostRatePassengerController from "./post-rate-passenger"
import makePostSelfConfirmEndedController from "./post-self-confirm-ended"
import makePostTravelReportController from "./post-travel-report"


const getTravelsController = makeGetItemsController({ listTravels })
const getTravelController = makeGetItemController({ listTravelInfos })
const postTravelController = makePostController({ addTravel })
const patchTravelController = makePatchController({ editTravel })
const deleteTravelController = makeDeleteController({ removeTravel })
const postNotifyController = makePostNotifyController({ confirmPayment })
const postRateDriverController =  makePostRateDriverController({rateDriver}) 
const postRatePassengerController = makePostRatePassengerController({ ratePassenger })
const postAskToStartController = makePostAskToStartController({ askToStart })
const postAskToEndController = makePostAskToEndController({ askToEnd })
const postConfirmStarted = makePostConfirmStartedController({ confirmStart })
const postConfirmEnded = makePostConfirmEndedController({ confirmEnd })
const postSelfConfirm = makePostSelfConfirmEndedController({ selfConfirmEnd })
const postTravelReportController = makePostTravelReportController({ travelReport })

export {
    getTravelsController,
    getTravelController,
    postTravelController,
    patchTravelController,
    deleteTravelController,
    postNotifyController,
    postRateDriverController,
    postRatePassengerController,
    postAskToStartController,
    postAskToEndController,
    postConfirmStarted,
    postConfirmEnded,
    postSelfConfirm,
    postTravelReportController
}
