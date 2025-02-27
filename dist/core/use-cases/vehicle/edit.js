"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const errors_1 = require("../../../utils/errors");
function makeEdit({ vehicleDb, saveProfile } = {}) {
    if (!vehicleDb || !saveProfile)
        throw new errors_1.ServerError();
    return ({ userId, id, type, color, model, numberPlate, registrationDoc } = {}) => (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
        if (!id)
            throw new errors_1.MissingParamError('id');
        if (!userId)
            throw new errors_1.MissingParamError('userId');
        const data = {};
        if (type)
            data.type = type;
        if (color)
            data.color = color;
        if (model)
            data.model = model;
        if (numberPlate)
            data.numberPlate = numberPlate;
        if (registrationDoc)
            data.registrationDoc = registrationDoc;
        if (Object.keys(data).length === 0)
            throw new errors_1.MissingParamError('all');
        yield vehicleDb.updateOne({ where: { id }, data });
        saveProfile(userId);
        const message = { text: "response.edit" };
        return { message };
    });
}
exports.default = makeEdit;
//# sourceMappingURL=edit.js.map