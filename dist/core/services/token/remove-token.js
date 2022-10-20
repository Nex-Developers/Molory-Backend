"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
function makeRemoveToken({ removeInCache } = {}) {
    return function removeToken({ token, } = {}) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            return yield removeInCache('tokens', token);
        });
    };
}
exports.default = makeRemoveToken;
//# sourceMappingURL=remove-token.js.map