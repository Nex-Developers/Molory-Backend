"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.confirmWithdraw = exports.requestWithdraw = void 0;
const tslib_1 = require("tslib");
const firebase_1 = require("../../services/firebase");
const transaction_1 = require("../../services/transaction");
const confirm_1 = (0, tslib_1.__importDefault)(require("./confirm"));
const request_1 = (0, tslib_1.__importDefault)(require("./request"));
const requestWithdraw = (0, request_1.default)({ saveTransaction: transaction_1.saveTransaction });
exports.requestWithdraw = requestWithdraw;
const confirmWithdraw = (0, confirm_1.default)({ updateTransaction: transaction_1.updateTransaction, saveProfile: firebase_1.saveProfile });
exports.confirmWithdraw = confirmWithdraw;
//# sourceMappingURL=index.js.map