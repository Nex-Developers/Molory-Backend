"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const helpers_1 = require("../../../utils/helpers");
function makeListTransactions() {
    return ({ startAt, limit, } = {}) => (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
        if (!startAt)
            startAt = 0;
        if (!limit)
            limit = 100;
        const prisma = helpers_1.DbConnection.prisma;
        const data = yield prisma.transaction.findMany({ orderBy: { createdAt: 'desc' } });
        return { count: data.length, startAt, limit, data };
    });
}
exports.default = makeListTransactions;
//# sourceMappingURL=list-transactions.js.map