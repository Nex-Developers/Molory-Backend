"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const errors_1 = require("../../../utils/errors");
const helpers_1 = require("../../../utils/helpers");
const makeListItem = () => {
    return ({ id }) => (0, tslib_1.__awaiter)(void 0, void 0, void 0, function* () {
        if (!id)
            throw new errors_1.MissingParamError('id');
        const prisma = helpers_1.DbConnection.prisma;
        const data = yield prisma.wallet.findUnique({ where: { id }, include: { transactions: true } });
        return { data };
    });
};
exports.default = makeListItem;
//# sourceMappingURL=list-item.js.map