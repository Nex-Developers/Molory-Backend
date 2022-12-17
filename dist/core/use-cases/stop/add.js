"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const errors_1 = require("../../../utils/errors");
function makeAdd({ stopDb } = {}) {
    if (!stopDb)
        throw new errors_1.ServerError();
    return ({ tripId, longitude, latitude, address, description, activateAt } = {}) => (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
        if (!tripId)
            throw new errors_1.MissingParamError('tripId');
        if (!longitude)
            throw new errors_1.MissingParamError('longitude');
        if (!latitude)
            throw new errors_1.MissingParamError('latitude');
        if (!address)
            throw new errors_1.MissingParamError('address');
        const { id } = yield stopDb.insertOne({ data: { tripId, longitude, latitude, address, description, activateAt } });
        const message = { text: "response.add" };
        return { message, id };
    });
}
exports.default = makeAdd;
//# sourceMappingURL=add.js.map