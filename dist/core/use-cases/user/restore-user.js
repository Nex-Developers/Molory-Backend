"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const errors_1 = require("../../../utils/errors");
function makeRestoreUser({ userDb } = {}) {
    if (!userDb)
        throw new errors_1.ServerError();
    return function restoreUser({ id } = {}) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            if (!id)
                throw new errors_1.MissingParamError('id');
            yield userDb.updateOne({ where: { id }, data: { deletedAt: null } });
            const message = { text: "response.restore" };
            return { message };
        });
    };
}
exports.default = makeRestoreUser;
//# sourceMappingURL=restore-user.js.map