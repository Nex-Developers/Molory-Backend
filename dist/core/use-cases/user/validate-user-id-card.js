"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const errors_1 = require("../../../utils/errors");
function makeValidateUserIdCard({ userDb, walletDb } = {}) {
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
            if (user.idCardStatus != 2)
                throw new errors_1.AlreadyDoneError('before');
            if (response !== "validate") {
                yield userDb.updateOne({ where: { id: userId }, data: { idCardStatus: 0, idCardRejectionMessage: response, idCardModifiedAt: new Date() } });
            }
            else {
                const data = { idCardStatus: 1, idCardNumber: cardNumber, idCardModifiedAt: new Date(), status: 1 };
                if (user.driverLicenseStatus == 1)
                    data.role = "driver";
                yield userDb.updateOne({ where: { id: userId }, data });
                const wallet = yield walletDb.findFirst({ where: { id: userId } });
                if (!wallet)
                    yield walletDb.insertOne({ data: { id: userId } });
            }
            const message = { text: "response.edit" };
            return { message };
        });
    };
}
exports.default = makeValidateUserIdCard;
//# sourceMappingURL=validate-user-id-card.js.map