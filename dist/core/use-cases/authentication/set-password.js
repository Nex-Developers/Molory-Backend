"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const errors_1 = require("../../../utils/errors");
function makeSetPassword({ prisma, getOtp, userDb, deviceDb, generateToken, saveToken, removeOtp, removeTmpToken, hashPassword, } = {}) {
    if (!prisma || !getOtp || !userDb || !deviceDb || !generateToken || !saveToken || !removeOtp || !removeTmpToken || !hashPassword)
        throw new errors_1.ServerError();
    return function setPassword({ token, email, otp, password, lang, device } = {}) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            if (!email)
                throw new errors_1.MissingParamError('email');
            if (!otp)
                throw new errors_1.MissingParamError('otp');
            if (!device)
                throw new errors_1.MissingParamError('device');
            if (!token || !lang)
                throw new errors_1.ServerError();
            if (!password)
                throw new errors_1.MissingParamError('password');
            console.log('device', device);
            const otpIndex = yield getOtp({ phoneNumber: email, otp });
            if (otpIndex === null || otpIndex === undefined)
                throw new errors_1.OtpIncorrectError('');
            let user = yield userDb.findFirst({ where: { email } });
            password = yield hashPassword({ password });
            return yield prisma.$transaction((_) => (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
                if (!user) {
                    throw new errors_1.AccountNotFoundError('email');
                }
                else
                    user = yield userDb.updateOne({ where: { id: user.id }, data: { password } });
                const savedDevice = yield deviceDb.findFirst({ where: { id: device.id, userId: user.id } });
                if (!savedDevice)
                    yield deviceDb.insertOne({
                        data: {
                            id: device["id"],
                            userId: user["id"],
                            token: device["token"],
                            platform: device["platform"]
                        }
                    });
                const authToken = yield generateToken({ id: user.id, role: user.role });
                yield saveToken({ token: authToken });
                yield removeOtp({ phoneNumber: email });
                yield removeTmpToken({ token });
                const message = { text: 'auth.message.changePassword' };
                return { token: authToken, data: { id: user.id, avatar: user.avatar, firstName: user.firstName, lastName: user.lastName, phoneNumber: user.phoneNumber, email: user.email, birthDay: user.birthDay, createdAt: user.createdAt }, message };
            }));
        });
    };
}
exports.default = makeSetPassword;
//# sourceMappingURL=set-password.js.map