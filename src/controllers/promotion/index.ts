import { 
    addPromotion, 
    editPromotion, 
    listPromotions, 
    removePromotion 
} from "../../core/use-cases/promotion"
import makeDeleteController from "./delete"
import makeGetItemsController from "./get-items"
import makePatchController from "./patch"
import makePostController from "./post"

const postPromotionController = makePostController({ addPromotion })
const patchPromotionController = makePatchController({ editPromotion })
const deletePromotionController = makeDeleteController({ removePromotion })
const getPromotionsController = makeGetItemsController({ listPromotions })


export {
    postPromotionController,
    patchPromotionController,
    deletePromotionController,
    getPromotionsController,
}
