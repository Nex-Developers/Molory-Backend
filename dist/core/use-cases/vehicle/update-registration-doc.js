"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const errors_1 = require("../../../utils/errors");
function makeUpdateRegistrationDoc({ vehicleDb } = {}) {
    if (!vehicleDb)
        throw new errors_1.ServerError();
    return function ({ id, file } = {}) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            if (!id)
                throw new errors_1.MissingParamError('id');
            if (!file || file == {})
                throw new errors_1.MissingParamError('file');
            const registrationDoc = file.path.substring(file.path.indexOf("/"));
            vehicleDb.updateOne({ where: { id }, data: { registrationDoc } });
            const message = { text: 'response.edit.' };
            return { message, registrationDoc };
        });
    };
}
exports.default = makeUpdateRegistrationDoc;
//# sourceMappingURL=update-registration-doc.js.map