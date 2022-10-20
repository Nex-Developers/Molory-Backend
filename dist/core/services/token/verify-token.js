"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
function makeVerifyToken({ verify } = {}) {
    return function verifyToken({ token } = {}) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            return yield verify(token);
        });
    };
}
exports.default = makeVerifyToken;
//# sourceMappingURL=verify-token.js.map