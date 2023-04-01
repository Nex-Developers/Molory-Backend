"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const errors_1 = require("../../../utils/errors");
const helpers_1 = require("../../../utils/helpers");
function makeFind() {
    return ({ name }) => (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
        const prisma = helpers_1.DbConnection.prisma;
        const data = yield prisma.promotion.findFirst({ where: { name: name.toUpperCase(), deletedAt: null } });
        if (!data)
            throw new errors_1.InvalidParamError('name');
        return { data };
    });
}
exports.default = makeFind;
//# sourceMappingURL=find.js.map