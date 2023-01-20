import { ApiCaller } from '../../../utils/helpers'
import makeAddTask from './add-task'

const addTask = makeAddTask({ send: ApiCaller.send })

export {
    addTask
}
