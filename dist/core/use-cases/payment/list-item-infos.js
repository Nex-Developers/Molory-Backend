"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const errors_1 = require("../../../utils/errors");
function makeListItemInfos({ paymentDb } = {}) {
    if (!paymentDb)
        throw new errors_1.ServerError();
    return ({ id } = {}) => tslib_1.__awaiter(this, void 0, void 0, function* () {
        if (!id)
            throw new errors_1.MissingParamError('id');
        const data = yield paymentDb.findFirst({
            where: {
                id
            },
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
                travel: { select: {
                        id: true,
                        status: true,
                        createdAt: true
                    } }
            }
        });
        return { data };
    });
}
exports.default = makeListItemInfos;
//# sourceMappingURL=list-item-infos.js.map