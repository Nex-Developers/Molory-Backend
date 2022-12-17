"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = (0, tslib_1.__importDefault)(require("express"));
const adapters_1 = require("../../configs/adapters");
const middlewares_1 = require("../../configs/middlewares");
const vehicle_1 = require("../../controllers/vehicle");
exports.default = () => {
    const router = express_1.default.Router();
    router.get('/vehicle/:id', middlewares_1.langCheck, middlewares_1.authCheck, (0, adapters_1.expressRouterAdapter)(vehicle_1.getVehicleController));
    router.route('/vehicle')
        .get(middlewares_1.langCheck, middlewares_1.authCheck, (0, adapters_1.expressRouterAdapter)(vehicle_1.getVehiclesController))
        .post(middlewares_1.langCheck, middlewares_1.authCheck, (0, adapters_1.expressRouterAdapter)(vehicle_1.postVehicleController))
        .patch(middlewares_1.langCheck, middlewares_1.authCheck, (0, adapters_1.expressRouterAdapter)(vehicle_1.patchVehicleController))
        .delete(middlewares_1.langCheck, middlewares_1.authCheck, (0, adapters_1.expressRouterAdapter)(vehicle_1.deleteVehicleController));
    return router;
};
//# sourceMappingURL=vehicle.js.map