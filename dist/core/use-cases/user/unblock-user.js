"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const errors_1 = require("../../../utils/errors");
function makeUnblockUser({ userDb } = {}) {
    if (!userDb)
        throw new errors_1.ServerError();
    return function unblockUser({ id } = {}) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (!id)
                throw new errors_1.MissingParamError('id');
            yield userDb.updateOne({ where: { id }, data: { blockedAt: null } });
            const message = { text: "response.edit" };
            return { message };
        });
    };
}
exports.default = makeUnblockUser;
//# sourceMappingURL=unblock-user.js.map