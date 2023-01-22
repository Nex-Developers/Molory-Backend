"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWithdrawalsController = exports.postWithdrawalcontroller = exports.postConfirmwithdrawalcontroller = void 0;
const tslib_1 = require("tslib");
const withdrawal_1 = require("../../core/use-cases/withdrawal");
const get_items_1 = (0, tslib_1.__importDefault)(require("./get-items"));
const post_1 = (0, tslib_1.__importDefault)(require("./post"));
const post_confirm_1 = (0, tslib_1.__importDefault)(require("./post-confirm"));
const postWithdrawalcontroller = (0, post_1.default)({ addWithdrawal: withdrawal_1.addWithdrawal });
exports.postWithdrawalcontroller = postWithdrawalcontroller;
const postConfirmwithdrawalcontroller = (0, post_confirm_1.default)({ confirmWithdrawal: withdrawal_1.confirmWithdrawal });
exports.postConfirmwithdrawalcontroller = postConfirmwithdrawalcontroller;
const getWithdrawalsController = (0, get_items_1.default)({ listWithdrawals: withdrawal_1.listWithdrawals });
exports.getWithdrawalsController = getWithdrawalsController;
//# sourceMappingURL=index.js.map