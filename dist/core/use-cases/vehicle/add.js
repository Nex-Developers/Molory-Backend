"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const errors_1 = require("../../../utils/errors");
function makeAdd({ vehicleDb, saveProfile } = {}) {
    if (!vehicleDb || !saveProfile)
        throw new errors_1.ServerError();
    return ({ userId, type, model, color, numberPlate } = {}) => (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
        if (!userId)
            throw new errors_1.MissingParamError('userId');
        if (!type)
            throw new errors_1.MissingParamError('type');
        if (!color)
            throw new errors_1.MissingParamError('color');
        if (!numberPlate)
            throw new errors_1.MissingParamError('numberPlate');
        if (!model)
            throw new errors_1.MissingParamError('model');
        const { id } = yield vehicleDb.insertOne({ data: { userId, type, color, model, numberPlate } });
        saveProfile(userId);
        const message = { text: "response.add" };
        return { message, id };
    });
}
exports.default = makeAdd;
//# sourceMappingURL=add.js.map