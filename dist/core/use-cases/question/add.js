"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const errors_1 = require("../../../utils/errors");
exports.default = ({ questionDb }) => {
    if (!questionDb)
        throw new errors_1.ServerError();
    return ({ value }) => (0, tslib_1.__awaiter)(void 0, void 0, void 0, function* () {
        if (!value)
            throw new errors_1.MissingParamError('value');
        const { id } = yield questionDb.insertOne({ data: { value } });
        const message = { text: 'response.add' };
        return { message, id };
    });
};
//# sourceMappingURL=add.js.map