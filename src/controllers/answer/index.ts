import { 
    addAnswer, 
    editAnswer, 
    listAnswers, 
    removeAnswer 
} from "../../core/use-cases/answer"
import makeDeleteController from "./delete"
import makeGetItemsController from "./get-items"
import makePatchController from "./patch"
import makePostController from "./post"

const postAnswerController = makePostController({ addAnswer })
const patchAnswerController = makePatchController({ editAnswer })
const deleteAnswerController = makeDeleteController({ removeAnswer })
const getAnswersController = makeGetItemsController({ listAnswers })


export {
    postAnswerController,
    patchAnswerController,
    deleteAnswerController,
    getAnswersController,
}