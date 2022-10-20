import { 
    UserDb } from "../../../db"
import makeSet from "./set"
import makeListItems from "./list-user-items"

// const configurationDb = new ConfigurationDb()
const userDb = new UserDb()

const setConfiguration = makeSet({ userDb })
const listUserConfigurations = makeListItems({ userDb })

export {
    setConfiguration,
    listUserConfigurations
}