"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const errors_1 = require("../../../utils/errors");
const helpers_1 = require("../../../utils/helpers");
function makeAdd() {
    return ({ name, discount, description, limit, startAt, endAt, isForDriver }) => (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
        const prisma = helpers_1.DbConnection.prisma;
        if (!name)
            throw new errors_1.MissingParamError('name');
        if (!discount)
            throw new errors_1.MissingParamError('discount');
        if (!isForDriver)
            isForDriver = false;
        if (startAt)
            startAt = new Date(startAt);
        if (endAt)
            endAt = new Date(endAt);
        const { id } = yield prisma.promotion.create({ data: { name: name.toUpperCase(), discount, limit, description, isForDriver, startAt, endAt } });
        const message = { text: "response.add" };
        return { message, id };
    });
}
exports.default = makeAdd;
//# sourceMappingURL=add.js.map