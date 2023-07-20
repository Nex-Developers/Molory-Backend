"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = (0, tslib_1.__importDefault)(require("express"));
const adapters_1 = require("../../configs/adapters");
const middlewares_1 = require("../../configs/middlewares");
const refund_1 = require("../../controllers/refund");
exports.default = () => {
    const router = express_1.default.Router();
    router.route('/refund')
        .post(middlewares_1.langCheck, middlewares_1.authCheck, (0, adapters_1.expressRouterAdapter)(refund_1.postRefundcontroller));
    router.route('/refund-confirmation')
        .get((req, res) => res.send('success'))
        .post((0, adapters_1.expressRouterAdapter)(refund_1.postConfirmRefundcontroller));
    return router;
};
//# sourceMappingURL=refund.js.map