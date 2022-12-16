"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const errors_1 = require("../../../utils/errors");
function makeConfirmOtp({ prisma, getOtp, userDb, deviceDb, generateToken, saveToken, removeOtp, removeTmpToken } = {}) {
    if (!prisma || !getOtp || !userDb || !deviceDb || !generateToken || !saveToken || !removeOtp || !removeTmpToken)
        throw new errors_1.ServerError();
    return function confirmOtp({ token, phoneNumber, otp, lang, device } = {}) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (!phoneNumber)
                throw new errors_1.MissingParamError('phoneNumber');
            if (!otp)
                throw new errors_1.MissingParamError('otp');
            if (!device)
                throw new errors_1.MissingParamError('device');
            if (!token || !lang)
                throw new errors_1.ServerError();
            const otpIndex = yield getOtp({ phoneNumber, otp });
            if (otpIndex === null || otpIndex === undefined)
                throw new errors_1.OtpIncorrectError('');
            let user = yield userDb.findFirst({ where: { phoneNumber } });
            const phoneNumberVerifiedAt = new Date();
            let firstAuth = false;
            return yield prisma.$transaction((_) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                if (!user) {
                    firstAuth = true;
                    user = yield userDb.insertOne({
                        data: {
                            phoneNumber,
                            phoneNumberVerifiedAt,
                            role: 'user',
                            status: 2,
                            firstName: "",
                            lastName: "",
                            language: lang,
                            password: "",
                            signUpMethod: "phoneNumber",
                        }
                    });
                }
                else
                    user = yield userDb.updateOne({ where: { id: user.id }, data: { phoneNumberVerifiedAt } });
                console.log(user);
                if (device.id && device.platform && device.token) {
                    const savedDevice = yield deviceDb.findFirst({ where: { id: device.id, userId: user.id } });
                    if (!savedDevice)
                        yield deviceDb.insertOne({
                            data: {
                                id: device.id,
                                userId: user.id,
                                token: device.token,
                                platform: device.platform
                            }
                        });
                }
                const authToken = yield generateToken({ id: user.id, role: user.role });
                yield saveToken({ token: authToken });
                yield removeOtp({ phoneNumber });
                yield removeTmpToken({ token });
                const message = { text: 'auth.message.otpVerified' };
                return { token: authToken, data: { id: user.id, avatar: user.avatar, firstName: user.firstName, lastName: user.lastName, phoneNumber: user.phoneNumber, email: user.email, birthDay: user.birthDay, createdAt: user.createdAt }, firstAuth, message };
            }));
        });
    };
}
exports.default = makeConfirmOtp;
//# sourceMappingURL=confirm-otp.js.map