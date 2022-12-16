"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const adapters_1 = require("../../configs/adapters");
const middlewares_1 = require("../../configs/middlewares");
const configuration_1 = require("../../controllers/configuration");
exports.default = () => {
    const router = express_1.default.Router();
    router.route('/configuration')
        .get(middlewares_1.langCheck, middlewares_1.authCheck, (0, adapters_1.expressRouterAdapter)(configuration_1.getConfigurationsController))
        .post(middlewares_1.langCheck, middlewares_1.authCheck, (0, adapters_1.expressRouterAdapter)(configuration_1.postConfigurationController));
    return router;
};
//# sourceMappingURL=configuration.js.map