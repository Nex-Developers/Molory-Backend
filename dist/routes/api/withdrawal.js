"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = (0, tslib_1.__importDefault)(require("express"));
const adapters_1 = require("../../configs/adapters");
const middlewares_1 = require("../../configs/middlewares");
const withdrawal_1 = require("../../controllers/withdrawal");
exports.default = () => {
    const router = express_1.default.Router();
    router.route('/withdrawal')
        .get(middlewares_1.langCheck, middlewares_1.authCheck, middlewares_1.driverCheck, (0, adapters_1.expressRouterAdapter)(withdrawal_1.getWithdrawalsController))
        .post(middlewares_1.langCheck, middlewares_1.authCheck, middlewares_1.driverCheck, (0, adapters_1.expressRouterAdapter)(withdrawal_1.postWithdrawalcontroller));
    router.post('/withdrawal-confirmation', (0, adapters_1.expressRouterAdapter)(withdrawal_1.postConfirmwithdrawalcontroller));
    return router;
};
//# sourceMappingURL=withdrawal.js.map