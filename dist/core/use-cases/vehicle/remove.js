"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const errors_1 = require("../../../utils/errors");
function makeRemove({ vehicleDb, saveProfile } = {}) {
    if (!vehicleDb || !saveProfile)
        throw new errors_1.ServerError();
    return ({ id, userId } = {}) => (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
        if (!id)
            throw new errors_1.MissingParamError('id');
        if (!userId)
            throw new errors_1.MissingParamError('userId');
        yield vehicleDb.deleteOne({
            where: {
                id
            }
        });
        saveProfile(userId);
        const message = { text: 'response.remove' };
        return { message };
    });
}
exports.default = makeRemove;
//# sourceMappingURL=remove.js.map