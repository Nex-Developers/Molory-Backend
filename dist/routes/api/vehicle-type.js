"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const adapters_1 = require("../../configs/adapters");
const middlewares_1 = require("../../configs/middlewares");
const vehicle_type_1 = require("../../controllers/vehicle-type");
exports.default = () => {
    const router = express_1.default.Router();
    router.get('/vehicle-type/:id', middlewares_1.langCheck, middlewares_1.authCheck, (0, adapters_1.expressRouterAdapter)(vehicle_type_1.getVehicleTypeController));
    router.route('/vehicle-type')
        .get(middlewares_1.langCheck, middlewares_1.authCheck, (0, adapters_1.expressRouterAdapter)(vehicle_type_1.getVehicleTypesController))
        .post(middlewares_1.langCheck, middlewares_1.authCheck, middlewares_1.adminCheck, (0, adapters_1.expressRouterAdapter)(vehicle_type_1.postVehicleTypeController))
        .patch(middlewares_1.langCheck, middlewares_1.authCheck, middlewares_1.adminCheck, (0, adapters_1.expressRouterAdapter)(vehicle_type_1.patchVehicleTypeController))
        .delete(middlewares_1.langCheck, middlewares_1.authCheck, middlewares_1.adminCheck, (0, adapters_1.expressRouterAdapter)(vehicle_type_1.deleteVehicleTypeController));
    return router;
};
//# sourceMappingURL=vehicle-type.js.map