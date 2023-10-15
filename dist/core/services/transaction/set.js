"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const errors_1 = require("../../../utils/errors");
function makeSet({ set } = {}) {
    if (!set)
        throw new errors_1.ServerError();
    return ({ id, data }) => (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
        if (!id)
            throw new errors_1.MissingParamError("id");
        yield set('transactions', 'trans-' + id, data);
        return;
    });
}
exports.default = makeSet;
//# sourceMappingURL=set.js.map