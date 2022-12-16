"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const errors_1 = require("../../../utils/errors");
function makeRemoveAccount({ removeToken, userDb } = {}) {
    if (!removeToken || !userDb)
        throw new errors_1.ServerError();
    return function removeAccount({ token, id } = {}) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield removeToken({ token }),
                yield userDb.deleteOne({ where: { id } });
            const message = { text: 'auth.message.removeAccount' };
            return { message };
        });
    };
}
exports.default = makeRemoveAccount;
//# sourceMappingURL=remove-account.js.map