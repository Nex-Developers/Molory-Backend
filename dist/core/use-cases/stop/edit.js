"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const errors_1 = require("../../../utils/errors");
function makeEdit({ stopDb } = {}) {
    if (!stopDb)
        throw new errors_1.ServerError();
    return ({ id, longitude, latitude, address, description, activateAt } = {}) => (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
        if (!id)
            throw new errors_1.MissingParamError('id');
        const data = {};
        if (longitude)
            data.longitude = longitude;
        if (latitude)
            data.latitude = latitude;
        if (address)
            data.address = address;
        if (description)
            data.description = description;
        if (activateAt)
            data.activateAt = activateAt;
        if (Object.keys(data).length === 0)
            throw new errors_1.MissingParamError('all');
        yield stopDb.updateOne({ where: { id }, data });
        const message = { text: "response.edit" };
        return { message };
    });
}
exports.default = makeEdit;
//# sourceMappingURL=edit.js.map