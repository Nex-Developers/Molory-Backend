"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
function makeComparePasswords({ decrypt }) {
    return function comparePasswords({ hash, password }) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            return yield decrypt(password, hash);
        });
    };
}
exports.default = makeComparePasswords;
//# sourceMappingURL=compare-passwords.js.map