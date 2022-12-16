"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const adapters_1 = require("../../configs/adapters");
const middlewares_1 = require("../../configs/middlewares");
const travel_1 = require("../../controllers/travel");
exports.default = () => {
    const router = express_1.default.Router();
    router.get('/travel/:id', middlewares_1.langCheck, middlewares_1.authCheck, (0, adapters_1.expressRouterAdapter)(travel_1.getTravelController));
    router.route('/travel')
        .get(middlewares_1.langCheck, middlewares_1.queryParser, middlewares_1.authCheck, (0, adapters_1.expressRouterAdapter)(travel_1.getTravelsController))
        .post(middlewares_1.langCheck, middlewares_1.authCheck, (0, adapters_1.expressRouterAdapter)(travel_1.postTravelController))
        .patch(middlewares_1.langCheck, middlewares_1.authCheck, (0, adapters_1.expressRouterAdapter)(travel_1.patchTravelController))
        .delete(middlewares_1.langCheck, middlewares_1.authCheck, (0, adapters_1.expressRouterAdapter)(travel_1.deleteTravelController));
    router.post('/confirm-payment', middlewares_1.langCheck, middlewares_1.authCheck, (0, adapters_1.expressRouterAdapter)(travel_1.postNotifyController));
    return router;
};
//# sourceMappingURL=travel.js.map