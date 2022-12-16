"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const errors_1 = require("../../../utils/errors");
function makeListItemInfos({ vehicleDb } = {}) {
    if (!vehicleDb)
        throw new errors_1.ServerError();
    return ({ id } = {}) => tslib_1.__awaiter(this, void 0, void 0, function* () {
        if (!id)
            throw new errors_1.MissingParamError('id');
        const data = yield vehicleDb.findFirst({
            where: {
                id
            },
            select: {
                id: true,
                type: true,
                color: true,
                model: true,
                numberPlate: true,
                registrationDoc: true,
                createdAt: true
            }
        });
        return { data };
    });
}
exports.default = makeListItemInfos;
//# sourceMappingURL=list-item-infos.js.map