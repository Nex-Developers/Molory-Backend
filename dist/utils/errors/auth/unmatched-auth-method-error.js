"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnmatchedAuthMethodError = void 0;
const __1 = require("..");
class UnmatchedAuthMethodError extends __1.InvalidParamError {
    constructor(parameter) {
        super(parameter, 'error.unmatchedAuthMethod');
    }
}
exports.UnmatchedAuthMethodError = UnmatchedAuthMethodError;
//# sourceMappingURL=unmatched-auth-method-error.js.map