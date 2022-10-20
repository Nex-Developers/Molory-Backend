"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = (0, tslib_1.__importDefault)(require("express"));
const adapters_1 = require("../../configs/adapters");
const middlewares_1 = require("../../configs/middlewares");
const trip_1 = require("../../controllers/trip");
exports.default = () => {
    const router = express_1.default.Router();
    router.route('/trip')
        .get(middlewares_1.langCheck, middlewares_1.queryParser, middlewares_1.authCheck, (0, adapters_1.expressRouterAdapter)(trip_1.getTripsController))
        .post(middlewares_1.langCheck, middlewares_1.authCheck, middlewares_1.driverCheck, (0, adapters_1.expressRouterAdapter)(trip_1.postTripController));
    router.post('/confirm-trip', middlewares_1.langCheck, middlewares_1.authCheck, middlewares_1.driverCheck, (0, adapters_1.expressRouterAdapter)(trip_1.patchTripConfirmController));
    return router;
};
//# sourceMappingURL=trip.js.map