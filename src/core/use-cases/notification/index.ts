import { NotificationDb, PublicationDb } from '../../../db'
import  makeListItems  from './list-items'
import  makeSetAsSeen from './set-as-seen'

const publicationDb = new PublicationDb()
const notificationDb = new NotificationDb()

const listNotifications = makeListItems({ notificationDb })
const setAsSeen = makeSetAsSeen({ publicationDb })

export {
    listNotifications,
    setAsSeen
}
