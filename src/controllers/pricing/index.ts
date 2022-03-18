import { 
    addPricing, 
    editPricing, 
    listPricingInfos, 
    listPricing, 
    removePricing 
} from "../../core/use-cases/pricing"
import makeDeleteController from "./delete"
import makeGetItemController from "./get-item"
import makeGetItemsController from "./get-items"
import makePatchController from "./patch"
import makePostController from "./post"

const postPricingController = makePostController({ addPricing })
const patchPricingController = makePatchController({ editPricing })
const deletePricingController = makeDeleteController({ removePricing })
const getPricingsController = makeGetItemsController({ listPricing })
const getPricingController = makeGetItemController({ listPricingInfos })


export {
    postPricingController,
    patchPricingController,
    deletePricingController,
    getPricingsController,
    getPricingController
}