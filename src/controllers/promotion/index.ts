import { 
    addPromotion, 
    editPromotion, 
    findPromotion, 
    listPromotions, 
    removePromotion 
} from "../../core/use-cases/promotion"
import makeDeleteController from "./delete"
import makeGetItemController from "./get-item"
import makeGetItemsController from "./get-items"
import makePatchController from "./patch"
import makePostController from "./post"

const postPromotionController = makePostController({ addPromotion })
const patchPromotionController = makePatchController({ editPromotion })
const deletePromotionController = makeDeleteController({ removePromotion })
const getPromotionsController = makeGetItemsController({ listPromotions })
const getPromotionController = makeGetItemController({ findPromotion})

export {
    postPromotionController,
    patchPromotionController,
    deletePromotionController,
    getPromotionsController,
    getPromotionController
}
