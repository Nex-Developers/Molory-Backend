"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.withdrawWallet = exports.rechargeWallet = exports.listWalletInfos = void 0;
const tslib_1 = require("tslib");
const firebase_1 = require("../../services/firebase");
const notifications_1 = require("../../services/notifications");
const transaction_1 = require("../../services/transaction");
const list_item_1 = (0, tslib_1.__importDefault)(require("./list-item"));
const recharge_1 = (0, tslib_1.__importDefault)(require("./recharge"));
const widraw_1 = (0, tslib_1.__importDefault)(require("./widraw"));
const listWalletInfos = (0, list_item_1.default)();
exports.listWalletInfos = listWalletInfos;
const rechargeWallet = (0, recharge_1.default)({ setTransaction: transaction_1.setTransaction, saveProfile: firebase_1.saveProfile, notifyUser: notifications_1.notifyUser });
exports.rechargeWallet = rechargeWallet;
const withdrawWallet = (0, widraw_1.default)({ setTransaction: transaction_1.setTransaction, saveProfile: firebase_1.saveProfile, notifyUser: notifications_1.notifyUser });
exports.withdrawWallet = withdrawWallet;
//# sourceMappingURL=index.js.map