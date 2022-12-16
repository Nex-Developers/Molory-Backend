"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const adapters_1 = require("../../configs/adapters");
const middlewares_1 = require("../../configs/middlewares");
const preference_1 = require("../../controllers/preference");
exports.default = () => {
    const router = express_1.default.Router();
    router.get('/preference/:id', middlewares_1.langCheck, middlewares_1.authCheck, (0, adapters_1.expressRouterAdapter)(preference_1.getPreferenceController));
    router.route('/preference')
        .get(middlewares_1.langCheck, middlewares_1.authCheck, (0, adapters_1.expressRouterAdapter)(preference_1.getPreferencesController))
        .post(middlewares_1.langCheck, middlewares_1.authCheck, (0, adapters_1.expressRouterAdapter)(preference_1.postPreferenceController))
        .patch(middlewares_1.langCheck, middlewares_1.authCheck, middlewares_1.adminCheck, (0, adapters_1.expressRouterAdapter)(preference_1.patchPreferenceController))
        .delete(middlewares_1.langCheck, middlewares_1.authCheck, middlewares_1.adminCheck, (0, adapters_1.expressRouterAdapter)(preference_1.deletePreferenceController));
    return router;
};
//# sourceMappingURL=preference.js.map