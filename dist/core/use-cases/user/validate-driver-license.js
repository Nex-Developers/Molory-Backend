"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const errors_1 = require("../../../utils/errors");
function makeValidateDriverLicense({ userDb, walletDb, saveProfile, notifyDevice, publicationDb } = {}) {
    if (!userDb || !walletDb || !saveProfile || !notifyDevice || !publicationDb)
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
            if (user.driverLicenseStatus != 2)
                throw new errors_1.AlreadyDoneError('before');
            if (response !== "validate") {
                yield userDb.updateOne({ where: { id: userId }, data: { driverLicenseStatus: 0, driverLicenseRejectionMessage: response, driverLicenseModifiedAt: new Date() } });
            }
            else {
                const res = { driverLicenseStatus: 1, driverLicenseNumber: cardNumber, driverLicenseModifiedAt: new Date(), status: 1 };
                if (user.idCardStatus == 1)
                    res.role = "driver";
                yield userDb.updateOne({ where: { id: userId }, data: res });
                const wallet = yield walletDb.findFirst({ where: { id: userId } });
                if (!wallet)
                    yield walletDb.insertOne({ data: { id: userId } });
                const deviceTokens = user.devices.map(device => device.token);
                const { title, body, data, cover } = yield notifyDevice({ deviceTokens, titleRef: { text: 'notification.driverActivated.title' }, messageRef: { text: 'notification.driverActivated.message', params: { name: user.lastName } }, cover: null, data: null, lang: 'fr' });
                yield publicationDb.insertOne({
                    data: {
                        title,
                        message: body,
                        data: data ? JSON.stringify(data) : null,
                        picture: cover,
                        notifications: {
                            create: {
                                user: {
                                    connect: { id: userId }
                                }
                            }
                        }
                    }
                });
            }
            saveProfile(userId);
            const message = { text: "response.edit" };
            return { message };
        });
    };
}
exports.default = makeValidateDriverLicense;
//# sourceMappingURL=validate-driver-license.js.map