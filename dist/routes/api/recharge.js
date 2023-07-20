"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = (0, tslib_1.__importDefault)(require("express"));
const adapters_1 = require("../../configs/adapters");
const middlewares_1 = require("../../configs/middlewares");
const recharge_1 = require("../../controllers/recharge");
exports.default = () => {
    const router = express_1.default.Router();
    router.route('/recharge')
        .post(middlewares_1.langCheck, middlewares_1.authCheck, (0, adapters_1.expressRouterAdapter)(recharge_1.postRechargeController));
    router.post('/validate-recharge', middlewares_1.langCheck, middlewares_1.fedapayQueryParser, (0, adapters_1.expressRouterAdapter)(recharge_1.postConfirmRechargeController));
    return router;
};
//# sourceMappingURL=recharge.js.map