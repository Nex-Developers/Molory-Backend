"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const errors_1 = require("../../../utils/errors");
const moment_1 = tslib_1.__importDefault(require("moment"));
function makeGetProfile({ userDb, walletDb } = {}) {
    if (!userDb || !walletDb)
        throw new errors_1.ServerError();
    return function getProfile({ id } = {}) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (!id)
                throw new errors_1.InvalidParamError('token');
            const res = yield userDb.findFirst({
                where: { id },
                select: {
                    avatar: true,
                    firstName: true,
                    lastName: true,
                    birthDay: true,
                    email: true,
                    gender: true,
                    role: true,
                    rating: true,
                    phoneNumber: true,
                    profileCompletedAt: true,
                    idCardFront: true,
                    idCardBack: true,
                    idCardStatus: true,
                    idCardNumber: true,
                    idCardRejectionMessage: true,
                    idCardModifiedAt: true,
                    driverLicenseFront: true,
                    driverLicenseBack: true,
                    driverLicenseStatus: true,
                    driverLicenseNumber: true,
                    driverLicenseRejectionMessage: true,
                    driverLicenseModifiedAt: true,
                    signUpMethod: true,
                    vehicles: true,
                    preferences: {
                        select: {
                            question: {
                                select: {
                                    id: true,
                                    value: true,
                                }
                            },
                            answer: {
                                select: {
                                    id: true,
                                    index: true,
                                    value: true,
                                }
                            }
                        }
                    },
                    _count: {
                        select: {
                            trips: true,
                            travels: true
                        }
                    }
                }
            });
            const documents = [];
            if (res.idCardFront || res.idCardBack) {
                documents.push({
                    name: "ID Card",
                    reference: res.idCardNumber,
                    urlFront: res.idCardFront,
                    urlBack: res.idCardBack,
                    status: res.idCardStatus,
                    rejectionMessage: res.idCardRejectionMessage,
                });
            }
            if (res.driverLicenseFront || res.driverLicenseBack) {
                documents.push({
                    name: "Driver License",
                    reference: res.driverLicenseNumber,
                    urlFront: res.driverLicenseFront,
                    urlBack: res.driverLicenseBack,
                    status: res.driverLicenseStatus,
                    rejectionMessage: res.driverLicenseRejectionMessage,
                });
            }
            const data = {
                id,
                avatar: res.avatar,
                firstName: res.firstName,
                lastName: res.lastName,
                birthDay: (0, moment_1.default)(res.birthDay).format('DD-MM-YYYY'),
                email: res.email,
                gender: res.gender,
                role: res.role,
                phoneNumber: res.phoneNumber,
                profileCompletedAt: res.profileCompletedAt,
                signUpMethod: res.signUpMethod,
                rating: res.rating,
                reviewsReceived: res.reviewsReceived,
                preferences: res.preferences,
                vehicles: res.vehicles,
                documents,
                stats: res._count
            };
            if (res.role === 'driver')
                data.wallet = yield walletDb.findFirst({
                    where: { id: res.userId },
                    select: {
                        balance: true,
                        currency: true
                    }
                });
            return { data };
        });
    };
}
exports.default = makeGetProfile;
//# sourceMappingURL=get-profile.js.map