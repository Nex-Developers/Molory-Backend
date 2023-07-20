"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTransaction = exports.saveTransaction = void 0;
const tslib_1 = require("tslib");
const helpers_1 = require("../../../utils/helpers");
const confirm_1 = (0, tslib_1.__importDefault)(require("./confirm"));
const save_1 = (0, tslib_1.__importDefault)(require("./save"));
const saveTransaction = (0, save_1.default)({ createTransaction: helpers_1.FedapayManager.createTransaction, set: helpers_1.FirestoreDb.set });
exports.saveTransaction = saveTransaction;
const updateTransaction = (0, confirm_1.default)({ update: helpers_1.FirestoreDb.update });
exports.updateTransaction = updateTransaction;
//# sourceMappingURL=index.js.map