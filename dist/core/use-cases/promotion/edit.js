"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const errors_1 = require("../../../utils/errors");
const helpers_1 = require("../../../utils/helpers");
function makeEdit() {
    return ({ id, name, discount, description, limit, startAt, endAt }) => (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
        const prisma = helpers_1.DbConnection.prisma;
        const data = {};
        if (name)
            data.name = name.toUpperCase();
        if (discount)
            data.discount;
        if (description)
            data.description = description;
        if (limit)
            data.limit = limit;
        if (startAt)
            data.startAt = startAt;
        if (endAt)
            data.endAt = endAt;
        if (!Object.keys(data).length)
            throw new errors_1.MissingParamError('data');
        yield prisma.promotion.update({ where: { id }, data });
        const message = { text: "response.edit" };
        return { message, id };
    });
}
exports.default = makeEdit;
//# sourceMappingURL=edit.js.map