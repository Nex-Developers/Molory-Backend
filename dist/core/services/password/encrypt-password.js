"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
function makeHashPassword({ encrypt }) {
    return function hashPassword({ password }) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield encrypt(password);
        });
    };
}
exports.default = makeHashPassword;
//# sourceMappingURL=encrypt-password.js.map