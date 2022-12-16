"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
function makeGenerateToken({ generate } = {}) {
    return function generateToken(data = {}) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield generate(data);
        });
    };
}
exports.default = makeGenerateToken;
//# sourceMappingURL=generate-token.js.map