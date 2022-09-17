"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const errors_1 = require("../../../utils/errors");
function makeValidateDriverLicense({ userDb, walletDb } = {}) {
    if (!userDb || !walletDb)
        throw new errors_1.ServerError();
    return function ({ userId, response, cardNumber } = {}) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            if (!userId)
                throw new errors_1.MissingParamError('userId');
            if (!cardNumber && response == "validate")
                throw new errors_1.MissingParamError('Card Number');
            const user = yield userDb.findFirst({ where: { id: userId } });
            if (!user)
                throw new errors_1.InvalidParamError('userId');
            if (user.driverLicenseStatus != 2)
                throw new errors_1.AlreadyDoneError('before');
            if (response !== "validate") {
                yield userDb.updateOne({ where: { id: userId }, data: { driverLicenseStatus: 0, driverLicenseRejectionMessage: response, driverLicenseModifiedAt: new Date() } });
            }
            else {
                const data = { driverLicenseStatus: 1, driverLicenseNumber: cardNumber, driverLicenseModifiedAt: new Date() };
                if (user.role === 'user')
                    data.role = "driver";
                yield userDb.updateOne({ where: { id: userId }, data });
                yield walletDb.insertOne({ data: { userId } });
            }
            const message = { text: "response.edit" };
            return { message };
        });
    };
}
exports.default = makeValidateDriverLicense;
//# sourceMappingURL=validate-driver-license.js.map