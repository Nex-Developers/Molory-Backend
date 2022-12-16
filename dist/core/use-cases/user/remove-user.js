"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const errors_1 = require("../../../utils/errors");
function makeRemoveUser({ userDb } = {}) {
    if (!userDb)
        throw new errors_1.ServerError();
    return function removeUser({ id, } = {}) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (!id)
                throw new errors_1.MissingParamError('id');
            yield userDb.deleteOne({ where: { id } });
            const message = { text: "response.remove" };
            return { message };
        });
    };
}
exports.default = makeRemoveUser;
//# sourceMappingURL=remove-user.js.map