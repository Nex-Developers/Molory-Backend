"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const errors_1 = require("../../../utils/errors");
function makeCheckPassword({ userDb, deviceDb, generateToken, saveToken, removeTmpToken, comparePasswords } = {}) {
    if (!userDb || !deviceDb || !generateToken || !saveToken || !removeTmpToken || !comparePasswords)
        throw new errors_1.ServerError();
    return function ({ token, id, password, device } = {}) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            if (!id)
                throw new errors_1.InvalidParamError('Token');
            if (!password)
                throw new errors_1.MissingParamError('password');
            if (!device)
                throw new errors_1.MissingParamError('device');
            const user = yield userDb.findFirst({ where: { id } });
            if (!(yield comparePasswords({ hash: user.password, password })))
                throw new errors_1.PasswordIncorrectError('password');
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