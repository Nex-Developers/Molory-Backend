"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const missing_param_error_1 = require("./../../../utils/errors/missing-param-error");
const errors_1 = require("../../../utils/errors");
const helpers_1 = require("../../../utils/helpers");
const moment_1 = (0, tslib_1.__importDefault)(require("moment"));
function makeSaveProfile({ set } = {}) {
    if (!set)
        throw new errors_1.ServerError();
    return (id) => (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
        const prisma = helpers_1.DbConnection.prisma;
        if (!id)
            throw new missing_param_error_1.MissingParamError(id);
        const res = yield prisma.user.findUnique({
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
                passengerReviews: { select: {
                        rating: true,
                        comment: true,
                        createdAt: true,
                        updatedAt: true,
                        by: true
                    } },
                driverReviews: { select: {
                        rating: true,
                        comment: true,
                        createdAt: true,
                        updatedAt: true,
                        by: true
                    } },
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
        const allReviews = res.passengerReviews.concat(res.driverReviews);
        const reviews = allReviews.sort((a, b) => b.createdAt - a.createdAt);
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
            preferences: res.preferences,
            vehicles: res.vehicles,
            documents,
            stats: res._count,
            reviews
        };
        data.wallet = yield prisma.wallet.findUnique({
            where: { id },
            select: {
                balance: true,
                currency: true
            }
        });
        return yield set('users', id.toString(), data);
    });
}
exports.default = makeSaveProfile;
//# sourceMappingURL=save-profile.js.map