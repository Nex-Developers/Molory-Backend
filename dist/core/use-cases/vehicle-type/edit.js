"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const errors_1 = require("../../../utils/errors");
function makeEdit({ vehicleTypeDb } = {}) {
    if (!vehicleTypeDb)
        throw new errors_1.ServerError();
    return ({ name, description, maxSeats } = {}) => tslib_1.__awaiter(this, void 0, void 0, function* () {
        if (!name)
            throw new errors_1.MissingParamError('name');
        const data = {};
        if (description)
            data.description = description;
        if (maxSeats)
            data.maxSeats = maxSeats;
        if (Object.keys(data).length === 0)
            throw new errors_1.MissingParamError('all');
        yield vehicleTypeDb.updateOne({ where: { name }, data });
        const message = { text: "response.edit" };
        return { message };
    });
}
exports.default = makeEdit;
//# sourceMappingURL=edit.js.map