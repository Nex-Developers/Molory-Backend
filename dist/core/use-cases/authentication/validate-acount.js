"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const errors_1 = require("../../../utils/errors");
function makeValidateAccount({ prisma, getOtp, userDb, deviceDb, generateToken, saveToken, removeOtp, removeTmpToken, notifyDevice, publicationDb } = {}) {
    if (!prisma || !getOtp || !userDb || !deviceDb || !generateToken || !saveToken || !removeOtp || !removeTmpToken || !notifyDevice || !publicationDb)
        throw new errors_1.ServerError();
    return function confirmOtp({ token, email, otp, lang, device } = {}) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            if (!email)
                throw new errors_1.MissingParamError('email');
            if (!otp)
                throw new errors_1.MissingParamError('otp');
            if (!device)
                throw new errors_1.MissingParamError('device');
            if (!token || !lang)
                throw new errors_1.ServerError();
            console.log('device', device);
            const otpIndex = yield getOtp({ phoneNumber: email, otp });
            if (otpIndex === null || otpIndex === undefined)
                throw new errors_1.OtpIncorrectError('');
            let user = yield userDb.findFirst({ where: { email } });
            const emailVerifiedAt = new Date();
            return yield prisma.$transaction((_) => (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
                if (!user) {
                    throw new errors_1.AccountNotFoundError('email');
                }
                else
                    user = yield userDb.updateOne({ where: { id: user.id }, data: { emailVerifiedAt, status: 2 } });
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
                const { title, body, data, cover } = yield notifyDevice({ deviceTokens: [device["token"]], titleRef: 'notification.signUpTitle', messageRef: 'notification.signUpMessage', cover: null, data: null, lang: 'fr' });
                yield publicationDb.insertOne({
                    data: {
                        title,
                        message: body,
                        data: data ? JSON.stringify(data) : null,
                        picture: cover,
                        notifications: {
                            create: {
                                user: {
                                    connect: { id: user.id }
                                }
                            }
                        }
                    }
                });
                const message = { text: 'auth.message.emailVerified' };
                return { token: authToken, data: { id: user.id, avatar: user.avatar, firstName: user.firstName, lastName: user.lastName, phoneNumber: user.phoneNumber, email: user.email, birthDay: user.birthDay, createdAt: user.createdAt }, message };
            }));
        });
    };
}
exports.default = makeValidateAccount;
//# sourceMappingURL=validate-acount.js.map