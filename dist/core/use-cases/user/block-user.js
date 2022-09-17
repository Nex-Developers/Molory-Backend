"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const errors_1 = require("../../../utils/errors");
function makeBlockUser({ userDb } = {}) {
    if (!userDb)
        throw new errors_1.ServerError();
    return function blockUser({ id } = {}) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            if (!id)
                throw new errors_1.MissingParamError('id');
            yield userDb.updateOne({ where: { id }, data: { blockedAt: new Date() } });
            const message = { text: "response.edit" };
            return { message };
        });
    };
}
exports.default = makeBlockUser;
//# sourceMappingURL=block-user.js.map