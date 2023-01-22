"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRefundsController = exports.postRefundcontroller = exports.postConfirmRefundcontroller = void 0;
const tslib_1 = require("tslib");
const refund_1 = require("../../core/use-cases/refund");
const get_items_1 = (0, tslib_1.__importDefault)(require("./get-items"));
const post_1 = (0, tslib_1.__importDefault)(require("./post"));
const post_confirm_1 = (0, tslib_1.__importDefault)(require("./post-confirm"));
const postRefundcontroller = (0, post_1.default)({ addRefund: refund_1.addRefund });
exports.postRefundcontroller = postRefundcontroller;
const postConfirmRefundcontroller = (0, post_confirm_1.default)({ confirmRefund: refund_1.confirmRefund });
exports.postConfirmRefundcontroller = postConfirmRefundcontroller;
const getRefundsController = (0, get_items_1.default)({ listRefunds: refund_1.listRefunds });
exports.getRefundsController = getRefundsController;
//# sourceMappingURL=index.js.map