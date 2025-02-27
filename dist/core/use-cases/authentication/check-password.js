"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const errors_1 = require("../../../utils/errors");
const helpers_1 = require("../../../utils/helpers");
function makeCheckPassword({ generateToken, saveToken, removeTmpToken, comparePasswords } = {}) {
    if (!generateToken || !saveToken || !removeTmpToken || !comparePasswords)
        throw new errors_1.ServerError();
    return function ({ token, id, password, device } = {}) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const prisma = helpers_1.DbConnection.prisma;
            if (!id)
                throw new errors_1.InvalidParamError('Token');
            if (!password)
                throw new errors_1.MissingParamError('password');
            if (!device)
                throw new errors_1.MissingParamError('device');
            console.log(device);
            console.log(device.id);
            if (!device.id || !device.token)
                throw new errors_1.InvalidParamError('device');
            const user = yield prisma.user.findFirst({ where: { id } });
            if (!(yield comparePasswords({ hash: user.password, password })))
                throw new errors_1.PasswordIncorrectError('password');
            const savedDevice = yield prisma.device.findUnique({ where: { id_userId: { id: device.id, userId: user.id } } });
            if (!savedDevice)
                yield prisma.device.create({
                    data: {
                        id: device.id,
                        userId: user.id,
                        token: device.token,
                        platform: device.platform
                    }
                });
            else if (savedDevice.token != device.token)
                yield prisma.device.update({ where: { id_userId: { id: device.id, userId: user.id } }, data: { token: device.token, updatedAt: new Date() } });
            const authToken = yield generateToken({ id: user.id, role: user.role });
            yield saveToken({ token: authToken });
            yield removeTmpToken({ token });
            const message = { text: 'auth.message.login' };
            return { token: authToken, message, data: { id: user.id, avatar: user.avatar, firstName: user.firstName, lastName: user.lastName, phoneNumber: user.phoneNumber, email: user.email, birthDay: user.birthDay, createdAt: user.createdAt } };
        });
    };
}
exports.default = makeCheckPassword;
//# sourceMappingURL=check-password.js.map