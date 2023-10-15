"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setTransaction = exports.updateTransaction = exports.saveTransaction = void 0;
const tslib_1 = require("tslib");
const helpers_1 = require("../../../utils/helpers");
const confirm_1 = (0, tslib_1.__importDefault)(require("./confirm"));
const save_1 = (0, tslib_1.__importDefault)(require("./save"));
const set_1 = (0, tslib_1.__importDefault)(require("./set"));
const saveTransaction = (0, save_1.default)({ createTransaction: helpers_1.FedapayManager.createTransaction, createWithdrawTransaction: helpers_1.FedapayManager.createWithdrawTransaction, set: helpers_1.FirestoreDb.set });
exports.saveTransaction = saveTransaction;
const updateTransaction = (0, confirm_1.default)({ update: helpers_1.FirestoreDb.update });
exports.updateTransaction = updateTransaction;
const setTransaction = (0, set_1.default)({ set: helpers_1.FirestoreDb.set });
exports.setTransaction = setTransaction;
//# sourceMappingURL=index.js.map