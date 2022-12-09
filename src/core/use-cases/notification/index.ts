import { NotificationDb } from '../../../db'
import  makeListItems  from './list-items'
import  makeSetAsSeen from './set-as-seen'

const notificationDb = new NotificationDb()

const listNotifications = makeListItems({ notificationDb })
const setAsSeen = makeSetAsSeen({ notificationDb })

export {
    listNotifications,
    setAsSeen
}
