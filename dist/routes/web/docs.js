"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const adapters_1 = require("../../configs/adapters");
const helpers_1 = require("../../utils/helpers");
exports.default = () => {
    const router = express_1.default.Router();
    router.get('/docs', (0, adapters_1.expressRouterAdapter)((httpRequest) => helpers_1.HttpResponse.ok({ view: 'pages/docs/index' }), 'html'));
    return router;
};
//# sourceMappingURL=docs.js.map