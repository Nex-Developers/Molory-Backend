"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const errors_1 = require("../../../utils/errors");
function makeSet({ userDb } = {}) {
    if (!userDb)
        throw new errors_1.ServerError();
    return ({ id, preferences } = {}) => (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
        if (!id)
            throw new errors_1.MissingParamError('id');
        if (!preferences)
            throw new errors_1.MissingParamError('preferences');
        const create = preferences.map(preference => ({ id: preference.id }));
        yield userDb.updateOne({ where: { id }, data: { preferences: { set: [] } } });
        yield userDb.updateOne({ where: { id }, data: { preferences: { connect: create } } });
        const message = { text: "response.edit" };
        return { message };
    });
}
exports.default = makeSet;
//# sourceMappingURL=set.js.map