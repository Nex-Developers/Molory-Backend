"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const errors_1 = require("../../../utils/errors");
function makeListItems({ vehicleDb } = {}) {
    if (!vehicleDb)
        throw new errors_1.ServerError();
    return ({ startAt, limit } = {}) => tslib_1.__awaiter(this, void 0, void 0, function* () {
        if (!startAt)
            startAt = 0;
        if (!limit)
            limit = 100;
        const data = yield vehicleDb.findMany({
            startAt,
            limit,
            select: {
                id: true,
                type: true,
                model: true,
                color: true,
                numberPlate: true,
                registrationDoc: true,
                createdAt: true
            }
        });
        return { count: data.length, startAt, limit, data };
    });
}
exports.default = makeListItems;
//# sourceMappingURL=list-items.js.map