"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
function makeSignOut({ removeToken } = {}) {
    return function signOut({ token } = {}) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield removeToken({ token });
            const message = { text: 'auth.message.logout' };
            return { message };
        });
    };
}
exports.default = makeSignOut;
//# sourceMappingURL=sign-out.js.map