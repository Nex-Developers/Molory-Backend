"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const errors_1 = require("../errors");
const bcrypt_1 = tslib_1.__importDefault(require("bcrypt"));
class Encrypter {
    static compare(value, hash) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (!value) {
                throw new errors_1.MissingParamError('value');
            }
            if (!hash) {
                throw new errors_1.MissingParamError('hash');
            }
            const isValid = yield bcrypt_1.default.compare(value, hash);
            return isValid;
        });
    }
    static hash(value) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield bcrypt_1.default.hash(value, 2);
        });
    }
}
exports.default = Encrypter;
//# sourceMappingURL=encrypter.js.map