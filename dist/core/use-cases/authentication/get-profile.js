"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const errors_1 = require("../../../utils/errors");
const moment_1 = (0, tslib_1.__importDefault)(require("moment"));
function makeGetProfile({ userDb } = {}) {
    if (!userDb)
        throw new errors_1.ServerError();
    return function getProfile({ id } = {}) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            if (!id)
                throw new errors_1.InvalidParamError('token');
            const data = yield userDb.findFirst({
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
                    reviewsReceived: true,
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
                            id: true,
                            question: true,
                            answer: true
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
            if (data.idCardFront || data.idCardBack) {
                documents.push({
                    name: "ID Card",
                    reference: data.idCardNumber,
                    urlFront: data.idCardFront,
                    urlBack: data.idCardBack,
                    status: data.idCardStatus,
                    rejectionMessage: data.idCardRejectionMessage,
                });
            }
            if (data.driverLicenseFront || data.driverLicenseBack) {
                documents.push({
                    name: "Driver License",
                    reference: data.driverLicenseNumber,
                    urlFront: data.driverLicenseFront,
                    urlBack: data.driverLicenseBack,
                    status: data.driverLicenseStatus,
                    rejectionMessage: data.driverLicenseRejectionMessage,
                });
            }
            return {
                data: {
                    avatar: data.avatar,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    birthDay: (0, moment_1.default)(data.birthDay).format('DD-MM-YYYY'),
                    email: data.email,
                    gender: data.gender,
                    role: data.role,
                    phoneNumber: data.phoneNumber,
                    profileCompletedAt: data.profileCompletedAt,
                    rating: data.rating,
                    reviewsReceived: data.reviewsReceived,
                    preferences: data.preferences,
                    vehicles: data.vehicles,
                    documents,
                    stats: data._count
                }
            };
        });
    };
}
exports.default = makeGetProfile;
//# sourceMappingURL=get-profile.js.map