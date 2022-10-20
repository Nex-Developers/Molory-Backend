"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = require("crypto");
class RandomChar {
    static randomStr(length) {
        return (0, crypto_1.randomBytes)(length).toString('hex');
    }
    static randomNum(length) {
        let code = '';
        for (let i = 0; i < length; i++) {
            code += (0, crypto_1.randomInt)(9);
        }
        return code;
    }
}
exports.default = RandomChar;
//# sourceMappingURL=random-char.js.map