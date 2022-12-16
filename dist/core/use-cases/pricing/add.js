"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const errors_1 = require("../../../utils/errors");
function makeAdd({ pricingDb } = {}) {
    if (!pricingDb)
        throw new errors_1.ServerError();
    return ({ vehicleTypeName, lowerDistance, upperDistance, unitPrice } = {}) => tslib_1.__awaiter(this, void 0, void 0, function* () {
        if (!vehicleTypeName)
            throw new errors_1.MissingParamError('vehicleTypeName');
        if (!lowerDistance)
            lowerDistance = 0;
        if (!upperDistance)
            throw new errors_1.MissingParamError('upperDistance');
        if (!unitPrice)
            throw new errors_1.MissingParamError('unitPrice');
        const { id } = yield pricingDb.insertOne({ data: { vehicleTypeName, lowerDistance, upperDistance, unitPrice } });
        const message = { text: "response.add" };
        return { message, id };
    });
}
exports.default = makeAdd;
//# sourceMappingURL=add.js.map