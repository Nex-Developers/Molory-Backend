"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const errors_1 = require("../../../utils/errors");
function makeListUserInfos({ userDb } = {}) {
    if (!userDb)
        throw new errors_1.ServerError();
    return function listUserInfos({ id, } = {}) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            if (!id)
                throw new errors_1.MissingParamError('id');
            const data = yield userDb.findFirst({
                where: { id }, select: {
                    id: true,
                    avatar: true,
                    firstName: true,
                    lastName: true,
                    birthDay: true,
                    email: true,
                    gender: true,
                    role: true,
                    rating: true,
                    createdAt: true,
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
                                    value: true,
                                }
                            }
                        }
                    },
                    _count: { select: {
                            trips: true,
                            travels: true
                        } }
                }
            });
            return {
                data: {
                    avatar: data.avatar,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    birthDay: data.birthDay,
                    email: data.email,
                    gender: data.gender,
                    role: data.role,
                    phoneNumber: data.phoneNumber,
                    profileCompletedAt: data.profileCompletedAt,
                    signUpMethod: data.signUpMethod,
                    rating: data.rating,
                    reviewsReceived: data.reviewsReceived,
                    vehicles: data.vehicles,
                    preferences: data.preferences,
                    createdAt: data.createdAt,
                    documents: [
                        {
                            name: "ID Card",
                            reference: data.idCardNumber,
                            urlFront: data.idCardFront,
                            urlBack: data.idCardBack,
                            status: data.idCardStatus,
                            rejectionMessage: data.idCardRejectionMessage,
                        },
                        {
                            name: "Driver License",
                            reference: data.driverLicenseNumber,
                            urlFront: data.driverLicenseFront,
                            urlBack: data.driverLicenseBack,
                            status: data.driverLicenseStatus,
                            rejectionMessage: data.driverLicenseRejectionMessage,
                        }
                    ],
                    stats: data._count
                }
            };
        });
    };
}
exports.default = makeListUserInfos;
//# sourceMappingURL=list-user-infos.js.map