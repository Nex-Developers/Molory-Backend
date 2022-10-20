"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const errors_1 = require("../errors");
const jsonwebtoken_1 = (0, tslib_1.__importDefault)(require("jsonwebtoken"));
const environment_1 = require("../../configs/environment");
class TokenManager {
    static generate(id) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            if (!TokenManager.secret) {
                throw new errors_1.MissingParamError('secret');
            }
            if (!id) {
                throw new errors_1.MissingParamError('id');
            }
            return jsonwebtoken_1.default.sign(id, TokenManager.secret);
        });
    }
    static verify(token) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            if (!token)
                throw new errors_1.MissingParamError('token');
            if (!TokenManager.secret)
                throw new errors_1.MissingParamError('secret');
            return jsonwebtoken_1.default.verify(token, TokenManager.secret);
        });
    }
}
exports.default = TokenManager;
TokenManager.secret = environment_1.env.token.secret;
//# sourceMappingURL=token-manager.js.map