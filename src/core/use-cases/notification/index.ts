import { PublicationDb } from '../../../db'
import { notifyUser } from '../../services/notifications'
import  makeListItems  from './list-items'
import  makeSetAsSeen from './set-as-seen'
import makePublishNotifications from './publish'

const publicationDb = new PublicationDb()

const listNotifications = makeListItems()
const setAsSeen = makeSetAsSeen({ publicationDb })
const publishNotifications = makePublishNotifications({ notifyUser })

export {
    listNotifications,
    setAsSeen,
    publishNotifications
}
