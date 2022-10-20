"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const errors_1 = require("../../../utils/errors");
function makeListToValidateUsers({ userDb } = {}) {
    if (!userDb)
        throw new errors_1.ServerError();
    return function ({ startAt, limit } = {}) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            if (!startAt)
                startAt = 0;
            if (!limit)
                limit = 100;
            const data = yield userDb.findMany({ startAt, limit, where: { OR: [{ driverLicenseStatus: 2 }, { idCardStatus: 2 }] }, select: {
                    id: true,
                    avatar: true,
                    lastName: true,
                    firstName: true,
                    phoneNumber: true,
                    gender: true,
                    email: true,
                    birthDay: true,
                    role: true,
                    createdAt: true,
                    blockedAt: true,
                    idCardFront: true,
                    idCardBack: true,
                    idCardStatus: true,
                    idCardRejectionMessage: true,
                    idCardModifiedAt: true,
                    driverLicenseFront: true,
                    driverLicenseBack: true,
                    driverLicenseStatus: true,
                    driverLicenseRejectionMessage: true,
                    driverLicenseModifiedAt: true
                } });
            return { data, count: data.length, startAt, limit };
        });
    };
}
exports.default = makeListToValidateUsers;
//# sourceMappingURL=list-to-validate-users.js.map