"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const errors_1 = require("../../../utils/errors");
function makeListItems({ withdrawalDb } = {}) {
    if (!withdrawalDb)
        throw new errors_1.ServerError();
    return ({ startAt, limit } = {}) => (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
        if (!startAt)
            startAt = 0;
        if (!limit)
            limit = 100;
        const data = yield withdrawalDb.findMany({
            startAt,
            limit,
            select: {
                type: true,
                method: true,
                amount: true,
                accessNumber: true,
                status: true,
                wallet: {
                    select: {
                        id: true,
                        balance: true,
                        user: {
                            select: {
                                id: true,
                                avatar: true,
                                lastName: true,
                                firstName: true,
                                phoneNumber: true,
                                role: true
                            }
                        }
                    }
                }
            }
        });
        return { data };
    });
}
exports.default = makeListItems;
//# sourceMappingURL=list-items.js.map