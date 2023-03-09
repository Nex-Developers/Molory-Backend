"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const errors_1 = require("../../../utils/errors");
function makeListItems({ paymentDb } = {}) {
    if (!paymentDb)
        throw new errors_1.ServerError();
    return ({ startAt, limit } = {}) => (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
        if (!startAt)
            startAt = 0;
        if (!limit)
            limit = 100;
        const data = yield paymentDb.findMany({
            startAt,
            limit,
            select: {
                id: true,
                method: true,
                amount: true,
                receivedAmount: true,
                reference: true,
                accessNumber: true,
                createdAt: true,
                validatedAt: true,
                status: true,
                user: {
                    select: {
                        id: true,
                        avatar: true,
                        lastName: true,
                        firstName: true,
                        phoneNumber: true,
                        role: true
                    }
                },
                travel: {
                    select: {
                        id: true,
                        status: true,
                        createdAt: true
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