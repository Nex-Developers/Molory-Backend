"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = (0, tslib_1.__importDefault)(require("express"));
const adapters_1 = require("../../configs/adapters");
const middlewares_1 = require("../../configs/middlewares");
const user_1 = require("../../controllers/user");
exports.default = () => {
    const router = express_1.default.Router();
    router.get('/user/:id', middlewares_1.langCheck, middlewares_1.authCheck, (0, adapters_1.expressRouterAdapter)(user_1.getUserController));
    router.get('/to-validate-user', middlewares_1.langCheck, middlewares_1.authCheck, middlewares_1.adminCheck, (0, adapters_1.expressRouterAdapter)(user_1.getToValidateUsersController));
    router.route('/user')
        .get(middlewares_1.langCheck, middlewares_1.authCheck, (0, adapters_1.expressRouterAdapter)(user_1.getUsersController))
        .post(middlewares_1.langCheck, middlewares_1.authCheck, middlewares_1.adminCheck, (0, adapters_1.expressRouterAdapter)(user_1.postUserController))
        .patch(middlewares_1.langCheck, middlewares_1.authCheck, middlewares_1.adminCheck, (0, adapters_1.expressRouterAdapter)(user_1.patchUserController))
        .delete(middlewares_1.langCheck, middlewares_1.authCheck, middlewares_1.adminCheck, (0, adapters_1.expressRouterAdapter)(user_1.deleteUserController));
    router.patch('/block-user', middlewares_1.langCheck, middlewares_1.authCheck, middlewares_1.adminCheck, (0, adapters_1.expressRouterAdapter)(user_1.blockUserController));
    router.patch('/unblock-user', middlewares_1.langCheck, middlewares_1.authCheck, middlewares_1.adminCheck, (0, adapters_1.expressRouterAdapter)(user_1.unblockUserController));
    router.get('/deleted-user', middlewares_1.langCheck, middlewares_1.authCheck, middlewares_1.adminCheck, (0, adapters_1.expressRouterAdapter)(user_1.deletedUsersController));
    router.get('/deleted-user/:id', middlewares_1.langCheck, middlewares_1.authCheck, middlewares_1.adminCheck, (0, adapters_1.expressRouterAdapter)(user_1.deletedUserController));
    router.patch('/restore-user', middlewares_1.langCheck, middlewares_1.authCheck, middlewares_1.adminCheck, (0, adapters_1.expressRouterAdapter)(user_1.restoreUserController));
    router.patch('/user-avatar', middlewares_1.langCheck, middlewares_1.authCheck, middlewares_1.adminCheck, middlewares_1.fileUpload.single('avatar'), (0, adapters_1.expressRouterAdapter)(user_1.patchUserAvatarController));
    router.post('/validate-id-card', middlewares_1.langCheck, middlewares_1.authCheck, middlewares_1.adminCheck, (0, adapters_1.expressRouterAdapter)(user_1.postValidateIdCardController));
    router.post('/validate-driver-license', middlewares_1.langCheck, middlewares_1.authCheck, middlewares_1.adminCheck, (0, adapters_1.expressRouterAdapter)(user_1.postValidateLicenseController));
    return router;
};
//# sourceMappingURL=user.js.map