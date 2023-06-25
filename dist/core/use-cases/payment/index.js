"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestPayment = exports.listPaymentInfos = exports.listPayments = void 0;
const tslib_1 = require("tslib");
const db_1 = require("../../../db");
const payment_1 = require("../../services/payment");
const list_item_infos_1 = (0, tslib_1.__importDefault)(require("./list-item-infos"));
const list_items_1 = (0, tslib_1.__importDefault)(require("./list-items"));
const request_1 = (0, tslib_1.__importDefault)(require("./request"));
const paymentDb = new db_1.PaymentDb();
const listPayments = (0, list_items_1.default)({ paymentDb });
exports.listPayments = listPayments;
const listPaymentInfos = (0, list_item_infos_1.default)({ paymentDb });
exports.listPaymentInfos = listPaymentInfos;
const requestPayment = (0, request_1.default)({ pay: payment_1.pay });
exports.requestPayment = requestPayment;
//# sourceMappingURL=index.js.map