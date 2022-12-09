import { 
    addQuestion, 
    editQuestion, 
    listQuestions, 
    removeQuestion 
} from "../../core/use-cases/question"
import makeDeleteController from "./delete"
import makeGetItemsController from "./get-items"
import makePatchController from "./patch"
import makePostController from "./post"

const postQuestionController = makePostController({ addQuestion })
const patchQuestionController = makePatchController({ editQuestion })
const deleteQuestionController = makeDeleteController({ removeQuestion })
const getQuestionsController = makeGetItemsController({ listQuestions })


export {
    postQuestionController,
    patchQuestionController,
    deleteQuestionController,
    getQuestionsController,
}