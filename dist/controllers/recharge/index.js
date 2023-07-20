"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postConfirmRechargeController = exports.postRechargeController = void 0;
const tslib_1 = require("tslib");
const recharge_1 = require("../../core/use-cases/recharge");
const confirm_1 = (0, tslib_1.__importDefault)(require("./confirm"));
const post_1 = (0, tslib_1.__importDefault)(require("./post"));
const postRechargeController = (0, post_1.default)({ requestRecharge: recharge_1.requestRecharge });
exports.postRechargeController = postRechargeController;
const postConfirmRechargeController = (0, confirm_1.default)({ confirmRecharge: recharge_1.confirmRecharge });
exports.postConfirmRechargeController = postConfirmRechargeController;
//# sourceMappingURL=index.js.map