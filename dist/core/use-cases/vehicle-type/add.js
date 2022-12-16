"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const errors_1 = require("../../../utils/errors");
function makeAdd({ vehicleTypeDb } = {}) {
    if (!vehicleTypeDb)
        throw new errors_1.ServerError();
    return ({ name, description, maxSeats } = {}) => tslib_1.__awaiter(this, void 0, void 0, function* () {
        if (!name)
            throw new errors_1.MissingParamError('name');
        if (!description)
            throw new errors_1.MissingParamError('description');
        yield vehicleTypeDb.insertOne({ data: { name, description, maxSeats } });
        const message = { text: "response.add" };
        return { message };
    });
}
exports.default = makeAdd;
//# sourceMappingURL=add.js.map