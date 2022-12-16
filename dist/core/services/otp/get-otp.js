"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
function makeGetOtp({ findInCache } = {}) {
    return function getOtp({ phoneNumber, otp } = {}) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield findInCache(phoneNumber, otp);
        });
    };
}
exports.default = makeGetOtp;
//# sourceMappingURL=get-otp.js.map