"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const errors_1 = require("../../../utils/errors");
function makeListItems({ vehicleTypeDb } = {}) {
    if (!vehicleTypeDb)
        throw new errors_1.ServerError();
    return ({ startAt, limit } = {}) => tslib_1.__awaiter(this, void 0, void 0, function* () {
        if (!startAt)
            startAt = 0;
        if (!limit)
            limit = 100;
        const data = yield vehicleTypeDb.findMany({
            startAt,
            limit,
            select: {
                name: true,
                maxSeats: true,
                description: true,
                createdAt: true
            }
        });
        return { data };
    });
}
exports.default = makeListItems;
//# sourceMappingURL=list-items.js.map