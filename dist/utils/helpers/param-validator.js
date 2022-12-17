"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const validator_1 = (0, tslib_1.__importDefault)(require("validator"));
class ParamValidator {
    static isEmail(email) {
        return validator_1.default.isEmail(email);
    }
    static isMobilePhone(phoneNumber) {
        return validator_1.default.isMobilePhone(phoneNumber);
    }
}
exports.default = ParamValidator;
//# sourceMappingURL=param-validator.js.map