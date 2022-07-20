import { addTravel, editTravel, listTravelInfos, listTravels, removeTravel } from "../../core/use-cases/travel"
import makeDeleteController from "./delete"
import makeGetItemController from "./get-item"
import makeGetItemsController from "./get-items"
import makePatchController from "./patch"
import makePostController from "./post"


const getTravelsController = makeGetItemsController({ listTravels })
const getTravelController = makeGetItemController({ listTravelInfos })
const postTravelController = makePostController({ addTravel })
const patchTravelController = makePatchController({ editTravel })
const deleteTravelController = makeDeleteController({ removeTravel })

export {
    getTravelsController,
    getTravelController,
    postTravelController,
    patchTravelController,
    deleteTravelController
}