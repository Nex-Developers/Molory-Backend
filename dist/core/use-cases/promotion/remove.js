"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const errors_1 = require("../../../utils/errors");
const helpers_1 = require("../../../utils/helpers");
function makeRemove() {
    return ({ id }) => (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
        const prisma = helpers_1.DbConnection.prisma;
        if (!id)
            throw new errors_1.MissingParamError('id');
        yield prisma.promotion.update({ where: { id }, data: { deletedAt: new Date() } });
        const message = { text: "response.remove" };
        return { message, id };
    });
}
exports.default = makeRemove;
//# sourceMappingURL=remove.js.map