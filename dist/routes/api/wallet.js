"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = (0, tslib_1.__importDefault)(require("express"));
const adapters_1 = require("../../configs/adapters");
const middlewares_1 = require("../../configs/middlewares");
const wallet_1 = require("../../controllers/wallet");
exports.default = () => {
    const router = express_1.default.Router();
    router.get('/wallet/:id', middlewares_1.langCheck, middlewares_1.authCheck, middlewares_1.adminCheck, (0, adapters_1.expressRouterAdapter)(wallet_1.getWalletController));
    router.patch('/recharge-wallet', middlewares_1.langCheck, middlewares_1.authCheck, middlewares_1.adminCheck, (0, adapters_1.expressRouterAdapter)(wallet_1.patchRechargeWalletController));
    router.patch('/withdraw-wallet', middlewares_1.langCheck, middlewares_1.authCheck, middlewares_1.adminCheck, (0, adapters_1.expressRouterAdapter)(wallet_1.patchWithdrawWalletController));
    return router;
};
//# sourceMappingURL=wallet.js.map