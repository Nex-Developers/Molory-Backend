"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
function makeRemoveOtp({ removeInCache } = {}) {
    return function removeOtp({ phoneNumber } = {}) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            return yield removeInCache(phoneNumber);
        });
    };
}
exports.default = makeRemoveOtp;
//# sourceMappingURL=remove-otp.js.map