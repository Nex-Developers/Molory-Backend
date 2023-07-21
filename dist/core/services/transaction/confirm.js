"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const errors_1 = require("../../../utils/errors");
function makeUpdate({ update } = {}) {
    if (!update)
        throw new errors_1.ServerError();
    return ({ id, status, params }) => (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
        if (!id)
            throw new errors_1.MissingParamError("id");
        if (!status)
            throw new errors_1.InvalidParamError("status");
        yield update('transactions', 'trans-' + id, Object.assign(Object.assign({}, params), { status }));
        return;
    });
}
exports.default = makeUpdate;
//# sourceMappingURL=confirm.js.map