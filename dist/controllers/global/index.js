"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTransactionsController = exports.getStatsController = void 0;
const tslib_1 = require("tslib");
const global_1 = require("../../core/use-cases/global");
const get_stats_1 = (0, tslib_1.__importDefault)(require("./get-stats"));
const get_transactions_1 = (0, tslib_1.__importDefault)(require("./get-transactions"));
const getStatsController = (0, get_stats_1.default)({ listStats: global_1.listStats });
exports.getStatsController = getStatsController;
const getTransactionsController = (0, get_transactions_1.default)({ listTransactions: global_1.listTransactions });
exports.getTransactionsController = getTransactionsController;
//# sourceMappingURL=index.js.map