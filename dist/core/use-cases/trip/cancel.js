"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const errors_1 = require("../../../utils/errors");
function makeCancel({ tripDb } = {}) {
    if (!tripDb)
        throw new errors_1.ServerError();
    return ({ id, } = {}) => (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
        if (!id)
            throw new errors_1.MissingParamError('id');
        yield tripDb.updateOne({ where: { id }, data: { status: 0 } });
        const message = { text: "response.add" };
        return { message };
    });
}
exports.default = makeCancel;
//# sourceMappingURL=cancel.js.map