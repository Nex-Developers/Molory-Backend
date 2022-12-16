"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
function makeSaveToken({ addInCache } = {}) {
    return function saveToken({ token, } = {}) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield addInCache('tokens', token);
        });
    };
}
exports.default = makeSaveToken;
//# sourceMappingURL=save-token.js.map