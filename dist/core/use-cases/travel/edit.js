"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const errors_1 = require("../../../utils/errors");
function makeEdit({ travelDb } = {}) {
    if (!travelDb)
        throw new errors_1.ServerError();
    return ({ id, title, description } = {}) => tslib_1.__awaiter(this, void 0, void 0, function* () {
        if (!id)
            throw new errors_1.MissingParamError('id');
        const data = {};
        if (title)
            data.title = title;
        if (description)
            data.description = description;
        if (Object.keys(data).length === 0)
            throw new errors_1.MissingParamError('all');
        yield travelDb.updateOne({ where: { id }, data });
        const message = { text: "response.edit" };
        return { message };
    });
}
exports.default = makeEdit;
//# sourceMappingURL=edit.js.map