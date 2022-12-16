"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const errors_1 = require("../../../utils/errors");
function makeRemove({ vehicleTypeDb } = {}) {
    if (!vehicleTypeDb)
        throw new errors_1.ServerError();
    return ({ name } = {}) => tslib_1.__awaiter(this, void 0, void 0, function* () {
        if (!name)
            throw new errors_1.MissingParamError('name');
        yield vehicleTypeDb.deleteOne({
            where: {
                name
            }
        });
        const message = { text: 'response.remove' };
        return { message };
    });
}
exports.default = makeRemove;
//# sourceMappingURL=remove.js.map