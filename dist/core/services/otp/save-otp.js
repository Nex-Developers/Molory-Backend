"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
function makeSaveOtp({ addInCache, removeOtp } = {}) {
    return function saveOtp({ phoneNumber, otp } = {}) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            yield removeOtp({ phoneNumber });
            return yield addInCache(phoneNumber, otp);
        });
    };
}
exports.default = makeSaveOtp;
//# sourceMappingURL=save-otp.js.map