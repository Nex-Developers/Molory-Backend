"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const errors_1 = require("../../../utils/errors");
function makeListItems({ withdrawalDb } = {}) {
    if (!withdrawalDb)
        throw new errors_1.ServerError();
    return ({ userId, startAt, limit } = {}) => (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
        if (!startAt)
            startAt = 0;
        if (!limit)
            limit = 100;
        let where;
        if (userId)
            where = { walletId: userId };
        const data = yield withdrawalDb.findMany({
            startAt,
            limit,
            where,
            orderBy: { createdAt: 'desc' },
            select: {
                method: true,
                amount: true,
                accessNumber: true,
                status: true,
                createdAt: true,
                validatedAt: true,
                user: {
                    select: {
                        id: true,
                        avatar: true,
                        firstName: true,
                        lastName: true,
                        phoneNumber: true
                    }
                }
            }
        });
        return {
            data: data.map(item => {
                const { user } = item, res = (0, tslib_1.__rest)(item, ["user"]);
                return Object.assign(Object.assign({}, res), user);
            })
        };
    });
}
exports.default = makeListItems;
//# sourceMappingURL=list-items.js.map