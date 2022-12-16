"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
function makeSaveTmpToken({ addInCache } = {}) {
    return function saveTmpToken({ token, } = {}) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield addInCache('tmp_tokens', token);
        });
    };
}
exports.default = makeSaveTmpToken;
//# sourceMappingURL=save-tmp-token.js.map