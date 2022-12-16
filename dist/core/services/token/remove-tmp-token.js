"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
function makeRemoveTmpToken({ removeInCache } = {}) {
    return function removeTmpToken({ token, } = {}) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield removeInCache('tmp_tokens', token);
        });
    };
}
exports.default = makeRemoveTmpToken;
//# sourceMappingURL=remove-tmp-token.js.map