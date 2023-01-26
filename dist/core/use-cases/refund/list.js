"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const helpers_1 = require("../../../utils/helpers");
function makeList() {
    return ({ userId, startAt, limit } = {}) => (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
        if (!startAt)
            startAt = 0;
        if (!limit)
            limit = 100;
        const prisma = helpers_1.DbConnection.prisma;
        let where;
        if (userId)
            where = { userId };
        const data = yield prisma.refund.findMany({
            where,
            select: {
                id: true,
                method: true,
                amount: true,
                accessNumber: true,
                createdAt: true,
                validatedAt: true,
                status: true,
                user: { select: {
                        id: true,
                        avatar: true,
                        lastName: true,
                        firstName: true,
                        phoneNumber: true,
                    } },
                travelId: true
            }
        });
        return { data };
    });
}
exports.default = makeList;
//# sourceMappingURL=list.js.map