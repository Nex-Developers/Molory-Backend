import makeAdd from './add'
import makeEdit from './edit'
import makeRemove from './remove'
import makeListItems from './list-items'
import { QuestionDb } from '../../../db'

const questionDb = new QuestionDb()

const addQuestion = makeAdd({ questionDb })
const editQuestion = makeEdit({ questionDb })
const removeQuestion = makeRemove({ questionDb })
const listQuestions = makeListItems({ questionDb })

export {
    addQuestion,
    editQuestion,
    removeQuestion,
    listQuestions
}
