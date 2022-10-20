"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPaymentState = exports.calculPrice = void 0;
const tslib_1 = require("tslib");
const helpers_1 = require("../../../utils/helpers");
const calcul_price_1 = (0, tslib_1.__importDefault)(require("./calcul-price"));
const get_payment_state_1 = (0, tslib_1.__importDefault)(require("./get-payment-state"));
const calculPrice = (0, calcul_price_1.default)({});
exports.calculPrice = calculPrice;
const getPaymentState = (0, get_payment_state_1.default)({ postData: helpers_1.ApiCaller.send });
exports.getPaymentState = getPaymentState;
//# sourceMappingURL=index.js.map