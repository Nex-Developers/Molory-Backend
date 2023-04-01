"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const helpers_1 = require("../../../utils/helpers");
function makeListItems() {
    return ({ startAt, limit }) => (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
        const prisma = helpers_1.DbConnection.prisma;
        if (!startAt)
            startAt = 0;
        if (!limit)
            limit = 1000;
        const data = yield prisma.promotion.findMany({ where: { deletedAt: null } });
        return { count: data.length, startAt, limit, data };
    });
}
exports.default = makeListItems;
//# sourceMappingURL=list-items.js.map