"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const errors_1 = require("../../../utils/errors");
const helpers_1 = require("../../../utils/helpers");
function makeChangePhoneNumber({ generateOtp, saveOtp, sendOtp, generateToken, removeToken, saveTmpToken, userDb } = {}) {
    if (!generateOtp || !saveOtp || !sendOtp || !generateToken || !saveTmpToken || !removeToken || !userDb)
        throw new errors_1.ServerError();
    return function changePhoneNumber({ id, phoneNumber, token } = {}) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            console.log(`changePhoneNumber ${phoneNumber}`);
            if (!id)
                throw new errors_1.MissingParamError('id');
            if (!phoneNumber)
                throw new errors_1.MissingParamError('phoneNumber');
            if (!token)
                throw new errors_1.MissingParamError('token');
            const user = yield userDb.findFirst({ where: { id }, select: { phoneNumber: true } });
            if (!user)
                throw new errors_1.InvalidParamError('id');
            if (user.phoneNumber === phoneNumber)
                throw new errors_1.AlreadyDoneError('before');
            const otp = yield generateOtp();
            const tmpToken = yield generateToken({ phoneNumber });
            yield saveTmpToken({ token: tmpToken });
            yield helpers_1.CacheManager.set(phoneNumber, JSON.stringify({ id, code: otp.toString() }));
            yield sendOtp({ phoneNumber, otp });
            const message = { text: 'auth.message.changePhoneNumber', params: { phoneNumber } };
            return { token: tmpToken, message };
        });
    };
}
exports.default = makeChangePhoneNumber;
//# sourceMappingURL=change-phone-number.js.map