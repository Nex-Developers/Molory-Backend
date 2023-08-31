"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = (0, tslib_1.__importDefault)(require("express"));
const adapters_1 = require("../../configs/adapters");
const middlewares_1 = require("../../configs/middlewares");
const global_1 = require("../../controllers/global");
exports.default = () => {
    const router = express_1.default.Router();
    router.route('/transactions').get(middlewares_1.langCheck, middlewares_1.authCheck, middlewares_1.adminCheck, (0, adapters_1.expressRouterAdapter)(global_1.getTransactionsController));
    router.route('/stats').get(middlewares_1.langCheck, middlewares_1.authCheck, middlewares_1.adminCheck, (0, adapters_1.expressRouterAdapter)(global_1.getStatsController));
    return router;
};
//# sourceMappingURL=global.js.map