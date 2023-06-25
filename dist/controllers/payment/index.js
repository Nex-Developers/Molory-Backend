"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getConfirmPayment = exports.postPaymentController = exports.getPaymentsController = void 0;
const tslib_1 = require("tslib");
const payment_1 = require("../../core/use-cases/payment");
const get_confirm_1 = (0, tslib_1.__importDefault)(require("./get-confirm"));
const get_items_1 = (0, tslib_1.__importDefault)(require("./get-items"));
const post_1 = (0, tslib_1.__importDefault)(require("./post"));
const getPaymentsController = (0, get_items_1.default)({ listPayments: payment_1.listPayments });
exports.getPaymentsController = getPaymentsController;
const postPaymentController = (0, post_1.default)({ requestPayment: payment_1.requestPayment });
exports.postPaymentController = postPaymentController;
const getConfirmPayment = (0, get_confirm_1.default)({ validatePayment: payment_1.validatePayment });
exports.getConfirmPayment = getConfirmPayment;
//# sourceMappingURL=index.js.map