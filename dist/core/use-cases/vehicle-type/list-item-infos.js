"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const errors_1 = require("../../../utils/errors");
function makeListItemInfos({ vehicleTypeDb } = {}) {
    if (!vehicleTypeDb)
        throw new errors_1.ServerError();
    return ({ name } = {}) => tslib_1.__awaiter(this, void 0, void 0, function* () {
        if (!name)
            throw new errors_1.MissingParamError('name');
        const data = yield vehicleTypeDb.findFirst({
            where: {
                name
            },
            select: {
                name: true,
                description: true,
                createdAt: true
            }
        });
        return { data };
    });
}
exports.default = makeListItemInfos;
//# sourceMappingURL=list-item-infos.js.map