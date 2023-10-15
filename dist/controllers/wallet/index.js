"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.patchWithdrawWalletController = exports.patchRechargeWalletController = exports.getWalletController = void 0;
const tslib_1 = require("tslib");
const wallet_1 = require("../../core/use-cases/wallet");
const get_item_1 = (0, tslib_1.__importDefault)(require("./get-item"));
const patch_recharge_1 = (0, tslib_1.__importDefault)(require("./patch-recharge"));
const patch_withdraw_1 = (0, tslib_1.__importDefault)(require("./patch-withdraw"));
const getWalletController = (0, get_item_1.default)({ listWalletInfos: wallet_1.listWalletInfos });
exports.getWalletController = getWalletController;
const patchRechargeWalletController = (0, patch_recharge_1.default)({ rechargeWallet: wallet_1.rechargeWallet });
exports.patchRechargeWalletController = patchRechargeWalletController;
const patchWithdrawWalletController = (0, patch_withdraw_1.default)({ withdrawWallet: wallet_1.withdrawWallet });
exports.patchWithdrawWalletController = patchWithdrawWalletController;
//# sourceMappingURL=index.js.map