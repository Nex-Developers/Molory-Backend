"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.comparePasswords = exports.hashPassword = void 0;
const tslib_1 = require("tslib");
const helpers_1 = require("../../../utils/helpers");
const encrypt_password_1 = (0, tslib_1.__importDefault)(require("./encrypt-password"));
const compare_passwords_1 = (0, tslib_1.__importDefault)(require("./compare-passwords"));
const hashPassword = (0, encrypt_password_1.default)({ encrypt: helpers_1.Encrypter.hash });
exports.hashPassword = hashPassword;
const comparePasswords = (0, compare_passwords_1.default)({ decrypt: helpers_1.Encrypter.compare });
exports.comparePasswords = comparePasswords;
//# sourceMappingURL=index.js.map