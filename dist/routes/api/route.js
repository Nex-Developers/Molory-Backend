"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const adapters_1 = require("../../configs/adapters");
const middlewares_1 = require("../../configs/middlewares");
const route_1 = require("../../controllers/route");
exports.default = () => {
    const router = express_1.default.Router();
    router.get('/route/:id', middlewares_1.langCheck, middlewares_1.authCheck, (0, adapters_1.expressRouterAdapter)(route_1.getRouteController));
    router.route('/route')
        .get(middlewares_1.langCheck, middlewares_1.queryParser, middlewares_1.authCheck, (0, adapters_1.expressRouterAdapter)(route_1.getRoutesController));
    return router;
};
//# sourceMappingURL=route.js.map