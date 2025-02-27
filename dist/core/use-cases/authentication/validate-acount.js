"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const errors_1 = require("../../../utils/errors");
const helpers_1 = require("../../../utils/helpers");
function makeValidateAccount({ getOtp, generateToken, saveToken, removeOtp, removeTmpToken, notifyUser, saveProfile } = {}) {
    if (!saveProfile || !getOtp || !generateToken || !saveToken || !removeOtp || !removeTmpToken || !notifyUser)
        throw new errors_1.ServerError();
    return function confirmOtp({ token, email, otp, lang, device, changeAuthParam, } = {}) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const prisma = helpers_1.DbConnection.prisma;
            if (!email)
                throw new errors_1.MissingParamError('email');
            if (!otp)
                throw new errors_1.MissingParamError('otp');
            if (!token || !lang)
                throw new errors_1.ServerError();
            if (changeAuthParam) {
                const saved = yield helpers_1.CacheManager.get(email);
                console.log('saved', saved);
                if (!saved)
                    throw new errors_1.InvalidParamError('changeAuthParam');
                const { id, code } = JSON.parse(saved);
                if (code !== otp)
                    throw new errors_1.OtpIncorrectError('');
                const message = { text: 'auth.message.emailVerified' };
                const { avatar, role, firstName, lastName, phoneNumber, birthDay, createdAt, signUpMethod } = yield prisma.user.update({
                    where: { id }, data: { email },
                    select: {
                        avatar: true,
                        role: true,
                        firstName: true,
                        lastName: true,
                        phoneNumber: true,
                        birthDay: true,
                        createdAt: true,
                        signUpMethod: true,
                    }
                });
                const authToken = yield generateToken({ id, role });
                yield saveToken({ token: authToken });
                yield removeOtp({ phoneNumber: email });
                yield removeTmpToken({ token });
                saveProfile(id);
                return { token: authToken, data: { id, avatar, firstName, lastName, phoneNumber, email, birthDay, createdAt, signUpMethod }, message };
            }
            else {
                console.log(device);
                console.log(device.id);
                if (!device)
                    throw new errors_1.MissingParamError('device');
                const otpIndex = yield getOtp({ phoneNumber: email, otp });
                if (otpIndex === null || otpIndex === undefined)
                    throw new errors_1.OtpIncorrectError('');
                let user = yield prisma.user.findFirst({ where: { email } });
                const emailVerifiedAt = new Date();
                return yield prisma.$transaction((_) => (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
                    if (!user) {
                        throw new errors_1.AccountNotFoundError('email');
                    }
                    else
                        user = yield prisma.user.update({ where: { id: user.id }, data: { emailVerifiedAt, status: 2 } });
                    const savedDevice = yield prisma.device.findUnique({ where: { id_userId: { id: device.id, userId: user.id } } });
                    if (!savedDevice)
                        yield prisma.device.create({
                            data: {
                                id: device["id"],
                                userId: user["id"],
                                token: device["token"],
                                platform: device["platform"]
                            }
                        });
                    else if (savedDevice.token != device.token)
                        yield prisma.device.update({ where: { id_userId: { id: device.id, userId: user.id } }, data: { token: device.token, updatedAt: new Date() } });
                    const authToken = yield generateToken({ id: user.id, role: user.role });
                    yield saveToken({ token: authToken });
                    yield removeOtp({ phoneNumber: email });
                    yield removeTmpToken({ token });
                    notifyUser({ id: user.id, titleRef: { text: 'notification.signup.title' }, messageRef: { text: 'notification.signup.message', params: { name: user.firstName } }, cover: null, data: { path: 'confirm-email', id: user.id.toString(), res: 'SUCCESS' }, lang: 'fr', type: 'authentication' });
                    saveProfile(user.id);
                    const message = { text: 'auth.message.emailVerified' };
                    return { token: authToken, data: { id: user.id, avatar: user.avatar, firstName: user.firstName, lastName: user.lastName, phoneNumber: user.phoneNumber, email: user.email, birthDay: user.birthDay, signUpMethod: user.signUpMethod, createdAt: user.createdAt }, message };
                }));
            }
        });
    };
}
exports.default = makeValidateAccount;
//# sourceMappingURL=validate-acount.js.map