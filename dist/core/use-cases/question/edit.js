"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const errors_1 = require("../../../utils/errors");
exports.default = ({ questionDb }) => {
    if (!questionDb)
        throw new errors_1.ServerError();
    return ({ id, value }) => (0, tslib_1.__awaiter)(void 0, void 0, void 0, function* () {
        if (!id)
            throw new errors_1.MissingParamError('id');
        if (!value)
            throw new errors_1.MissingParamError('value');
        yield questionDb.updateOne({ where: { id }, data: { value } });
        const message = { text: 'response.edit' };
        return { message };
    });
};
//# sourceMappingURL=edit.js.map