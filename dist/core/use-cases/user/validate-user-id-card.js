"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const errors_1 = require("../../../utils/errors");
function makeValidateUserIdCard({ userDb, walletDb, saveProfile, notifyUser, } = {}) {
    if (!userDb || !walletDb || !saveProfile || !notifyUser)
        throw new errors_1.ServerError();
    return function ({ userId, response, cardNumber } = {}) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            if (!userId)
                throw new errors_1.MissingParamError('userId');
            if (!cardNumber && response == "validate")
                throw new errors_1.MissingParamError('Card Number');
            const user = yield userDb.findFirst({ where: { id: userId }, select: { idCardStatus: true, driverLicenseStatus: true, lastName: true, devices: true } });
            if (!user)
                throw new errors_1.InvalidParamError('userId');
            if (user.idCardStatus != 2)
                throw new errors_1.AlreadyDoneError('before');
            if (response !== "validate") {
                yield userDb.updateOne({ where: { id: userId }, data: { idCardStatus: 0, idCardRejectionMessage: response, idCardModifiedAt: new Date() } });
            }
            else {
                const res = { idCardStatus: 1, idCardNumber: cardNumber, idCardModifiedAt: new Date(), status: 1 };
                if (user.driverLicenseStatus == 1)
                    res.role = "driver";
                yield userDb.updateOne({ where: { id: userId }, data: res });
                const wallet = yield walletDb.findFirst({ where: { id: userId } });
                if (!wallet)
                    yield walletDb.insertOne({ data: { id: userId } });
                const deviceTokens = user.devices.map(device => device.token);
                notifyUser({ deviceTokens, titleRef: { text: 'notification.driverActivated.title' }, messageRef: { text: 'notification.driverActivated.message', params: { name: user.lastName } }, cover: null, data: { path: 'validate-id-card', id: userId.toString(), res: 'INFOS' }, lang: 'fr', type: 'user' });
            }
            saveProfile(userId);
            const message = { text: "response.edit" };
            return { message };
        });
    };
}
exports.default = makeValidateUserIdCard;
//# sourceMappingURL=validate-user-id-card.js.map