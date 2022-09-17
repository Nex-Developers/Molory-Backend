"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const errors_1 = require("../../../utils/errors");
function makeListItemInfos({ withdrawalDb } = {}) {
    if (!withdrawalDb)
        throw new errors_1.ServerError();
    return ({ id } = {}) => (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
        if (!id)
            throw new errors_1.MissingParamError('id');
        const data = yield withdrawalDb.findFirst({
            where: {
                id
            },
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
exports.default = makeListItemInfos;
//# sourceMappingURL=list-item-infos.js.map