"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
function makeIsValidEmail({ emailValidator } = {}) {
    return function isValidEmail({ email } = {}) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            return yield emailValidator(email);
        });
    };
}
exports.default = makeIsValidEmail;
//# sourceMappingURL=is-valid-email.js.map