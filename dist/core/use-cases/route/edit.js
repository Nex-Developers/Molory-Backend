"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const errors_1 = require("../../../utils/errors");
function makeEdit({ routeDb } = {}) {
    if (!routeDb)
        throw new errors_1.ServerError();
    return ({ id, price, duration } = {}) => (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
        if (!id)
            throw new errors_1.MissingParamError('id');
        const data = {};
        if (price)
            data.price = price;
        if (duration)
            data.duration = duration;
        if (Object.keys(data).length === 0)
            throw new errors_1.MissingParamError('all');
        yield routeDb.updateOne({ where: { id }, data });
        const message = { text: "response.edit" };
        return { message };
    });
}
exports.default = makeEdit;
//# sourceMappingURL=edit.js.map