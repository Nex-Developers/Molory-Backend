"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const errors_1 = require("../../../utils/errors");
function makeEdit({ pricingDb } = {}) {
    if (!pricingDb)
        throw new errors_1.ServerError();
    return ({ id, vehicleTypeName, lowerDistance, upperDistance, unitPrice } = {}) => tslib_1.__awaiter(this, void 0, void 0, function* () {
        if (!id)
            throw new errors_1.MissingParamError('id');
        const data = {};
        if (vehicleTypeName)
            data.vehicleTypeName = vehicleTypeName;
        if (lowerDistance)
            data.lowerDistance = lowerDistance;
        if (upperDistance)
            data.upperDistance = upperDistance;
        if (unitPrice)
            data.unitPrice = unitPrice;
        if (Object.keys(data).length === 0)
            throw new errors_1.MissingParamError('all');
        yield pricingDb.updateOne({ where: { id }, data });
        const message = { text: "response.edit" };
        return { message };
    });
}
exports.default = makeEdit;
//# sourceMappingURL=edit.js.map