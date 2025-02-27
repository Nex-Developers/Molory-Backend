"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = (0, tslib_1.__importDefault)(require("express"));
const adapters_1 = require("../../configs/adapters");
const middlewares_1 = require("../../configs/middlewares");
const payment_1 = require("../../controllers/payment");
exports.default = () => {
    const router = express_1.default.Router();
    router.route('/payment')
        .get(middlewares_1.langCheck, middlewares_1.authCheck, middlewares_1.adminCheck, (0, adapters_1.expressRouterAdapter)(payment_1.getPaymentsController))
        .post(middlewares_1.langCheck, middlewares_1.authCheck, (0, adapters_1.expressRouterAdapter)(payment_1.postPaymentController));
    router.post('/validate-payment', middlewares_1.langCheck, middlewares_1.fedapayQueryParser, (0, adapters_1.expressRouterAdapter)(payment_1.getConfirmPayment));
    return router;
};
//# sourceMappingURL=payment.js.map