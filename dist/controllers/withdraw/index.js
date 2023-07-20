"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postConfirmWithdrawController = exports.postWithdrawController = void 0;
const tslib_1 = require("tslib");
const withdraw_1 = require("../../core/use-cases/withdraw");
const confirm_1 = (0, tslib_1.__importDefault)(require("./confirm"));
const post_1 = (0, tslib_1.__importDefault)(require("./post"));
const postWithdrawController = (0, post_1.default)({ requestWithdraw: withdraw_1.requestWithdraw });
exports.postWithdrawController = postWithdrawController;
const postConfirmWithdrawController = (0, confirm_1.default)({ confirmWithdraw: withdraw_1.confirmWithdraw });
exports.postConfirmWithdrawController = postConfirmWithdrawController;
//# sourceMappingURL=index.js.map