import { 
    addUser,
    blockUser,
    editUser,
    editUserAvatar,
    listRemovedUserInfos,
    listRemovedUsers,
    listUserInfos,
    listUsers,
    removeUser,
    restoreUser, 
    unblockUser
} from "../../core/use-cases/user"
import listToValidateUsers from "../../core/use-cases/user/list-to-validate-users"
import makeBlockUserController from "./block-user"
import makeDeleteUserController from "./delete-user"
import makeDeletedUserController from "./deleted-user"
import makeDeletedUsersController from "./deleted-users"
import makeGetToValidateUsersController from "./get-to-validate-users"
import makeGetUserController from "./get-user"
import makeGetUsersController from "./get-users"
import makePatchUserController from "./patch-user"
import makePatchUserAvatarController from "./patch-user-avatar"
import makePostUserController from "./post-user"
import makeRestoreUserController from "./restore-user"
import makeUnblockUserController from "./unblock-user"


const getUsersController = makeGetUsersController({ listUsers })
const getToValidateUsersController = makeGetToValidateUsersController({ listToValidateUsers })
const getUserController = makeGetUserController({ listUserInfos })
const postUserController = makePostUserController({ addUser })
const patchUserController = makePatchUserController({ editUser })
const deleteUserController = makeDeleteUserController({ removeUser })
const restoreUserController = makeRestoreUserController({ restoreUser })
const deletedUserController = makeDeletedUserController({ listRemovedUserInfos })
const deletedUsersController = makeDeletedUsersController({ listRemovedUsers })
const blockUserController = makeBlockUserController({ blockUser })
const unblockUserController = makeUnblockUserController({ unblockUser })
const patchUserAvatarController = makePatchUserAvatarController({ editUserAvatar })


export {
    getUsersController,
    getToValidateUsersController,
    getUserController,
    postUserController,
    patchUserController,
    deleteUserController,
    restoreUserController,
    deletedUserController,
    deletedUsersController,
    blockUserController,
    unblockUserController ,
    patchUserAvatarController
}

