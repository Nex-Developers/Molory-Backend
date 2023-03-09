"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listPaymentInfos = exports.listPayments = void 0;
const tslib_1 = require("tslib");
const db_1 = require("../../../db");
const list_item_infos_1 = (0, tslib_1.__importDefault)(require("./list-item-infos"));
const list_items_1 = (0, tslib_1.__importDefault)(require("./list-items"));
const paymentDb = new db_1.PaymentDb();
const listPayments = (0, list_items_1.default)({ paymentDb });
exports.listPayments = listPayments;
const listPaymentInfos = (0, list_item_infos_1.default)({ paymentDb });
exports.listPaymentInfos = listPaymentInfos;
//# sourceMappingURL=index.js.map