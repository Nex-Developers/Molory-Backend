"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const adapters_1 = require("../../configs/adapters");
const middlewares_1 = require("../../configs/middlewares");
const pricing_1 = require("../../controllers/pricing");
exports.default = () => {
    const router = express_1.default.Router();
    router.get('/pricing/:id', middlewares_1.langCheck, middlewares_1.authCheck, (0, adapters_1.expressRouterAdapter)(pricing_1.getPricingController));
    router.route('/pricing')
        .get(middlewares_1.langCheck, middlewares_1.authCheck, (0, adapters_1.expressRouterAdapter)(pricing_1.getPricingsController))
        .post(middlewares_1.langCheck, middlewares_1.authCheck, middlewares_1.adminCheck, (0, adapters_1.expressRouterAdapter)(pricing_1.postPricingController))
        .patch(middlewares_1.langCheck, middlewares_1.authCheck, middlewares_1.adminCheck, (0, adapters_1.expressRouterAdapter)(pricing_1.patchPricingController))
        .delete(middlewares_1.langCheck, middlewares_1.authCheck, middlewares_1.adminCheck, (0, adapters_1.expressRouterAdapter)(pricing_1.deletePricingController));
    return router;
};
//# sourceMappingURL=pricing.js.map