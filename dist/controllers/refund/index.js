"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postRefundcontroller = exports.postConfirmRefundcontroller = void 0;
const tslib_1 = require("tslib");
const refund_1 = require("../../core/use-cases/refund");
const post_1 = (0, tslib_1.__importDefault)(require("./post"));
const post_confirm_1 = (0, tslib_1.__importDefault)(require("./post-confirm"));
const postRefundcontroller = (0, post_1.default)({ addRefund: refund_1.addRefund });
exports.postRefundcontroller = postRefundcontroller;
const postConfirmRefundcontroller = (0, post_confirm_1.default)({ confirmRefund: refund_1.confirmRefund });
exports.postConfirmRefundcontroller = postConfirmRefundcontroller;
//# sourceMappingURL=index.js.map