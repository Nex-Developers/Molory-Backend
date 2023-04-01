import makeAdd from "./add";
import makeEdit from "./edit";
import makeListItems from "./list-items";
import makeRemove from "./remove";

const addPromotion = makeAdd()
const editPromotion = makeEdit()
const listPromotions = makeListItems()
const removePromotion = makeRemove()

export {
    addPromotion,
    editPromotion,
    listPromotions,
    removePromotion
}