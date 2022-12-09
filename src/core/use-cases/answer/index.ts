import makeAdd from './add'
import makeEdit from './edit'
import makeRemove from './remove'
import makeListItems from './list-items'
import { AnswerDb } from '../../../db'

const answerDb = new AnswerDb()

const addAnswer = makeAdd({ answerDb })
const editAnswer = makeEdit({ answerDb })
const removeAnswer = makeRemove({ answerDb })
const listAnswers = makeListItems({ answerDb })

export {
    addAnswer,
    editAnswer,
    removeAnswer,
    listAnswers
}
