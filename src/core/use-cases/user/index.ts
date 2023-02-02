
import { UserDb, WalletDb } from "../../../db"
import { askToConfirmEmail, isValidEmail } from "../../services/email"
import { saveProfile } from "../../services/firebase"
import { notifyUser } from "../../services/notifications"
import { hashPassword } from "../../services/password"
import { generateToken, saveTmpToken } from "../../services/token"
import { deleteAvatarFile } from "../../services/upload"
import makeAddUser from "./add-user"
import makeBlockUser from "./block-user"
import makeEditUser from "./edit-user"
import makeEditUserAvatar from "./edit-user-avatar"
import makeListRemovedUserInfos from "./list-removed-user-infos"
import makeListRemovedUsers from "./list-removed-users"
import makeListToValidateUsers from "./list-to-validate-users"
import makeListUserInfos from "./list-user-infos"
import makeListUsers from "./list-users"
import makeRateUser from "./rate-user"
import makeRemoveUser from "./remove-user"
import makeRestoreUser from "./restore-user"
import makeUnblockUser from "./unblock-user"
import makeValidateDriverLicense from "./validate-driver-license"
import makeValidateUserIdCard from "./validate-user-id-card"

const userDb = new UserDb()
const walletDb = new WalletDb()

const listUsers = makeListUsers({ userDb })
const listToValidateUsers = makeListToValidateUsers({ userDb })
const listUserInfos = makeListUserInfos({ userDb })
const addUser = makeAddUser({ userDb, isValidEmail, hashPassword, generateToken, askToConfirmEmail, saveTmpToken })
const editUser = makeEditUser({ userDb, isValidEmail, hashPassword })
const removeUser = makeRemoveUser({ userDb })
const restoreUser = makeRestoreUser({ userDb })
const blockUser = makeBlockUser({ userDb })
const unblockUser = makeUnblockUser({ userDb })
const listRemovedUsers = makeListRemovedUsers({ userDb })
const listRemovedUserInfos = makeListRemovedUserInfos({ userDb })
const editUserAvatar = makeEditUserAvatar({ userDb, deleteAvatarFile })
const validateUserIdCard = makeValidateUserIdCard({ userDb, notifyUser, walletDb, saveProfile })
const validateDriverLicense = makeValidateDriverLicense({ userDb, notifyUser, walletDb, saveProfile })
const rateUser = makeRateUser({ userDb })

export {
    listUserInfos,
    listUsers,
    listToValidateUsers,
    addUser,
    editUser,
    removeUser,
    restoreUser,
    blockUser,
    unblockUser,
    listRemovedUsers,
    listRemovedUserInfos,
    editUserAvatar,
    validateUserIdCard,
    validateDriverLicense,
    rateUser
}

