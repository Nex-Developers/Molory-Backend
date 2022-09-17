"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const errors_1 = require("../../../utils/errors");
function makeListItemInfos({ routeDb } = {}) {
    if (!routeDb)
        throw new errors_1.ServerError();
    return ({ id } = {}) => (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
        if (!id)
            throw new errors_1.MissingParamError('id');
        const data = yield routeDb.findFirst({
            where: {
                id
            },
            select: {
                trip: {
                    select: {
                        id: true,
                        seats: true,
                        remainingSeats: true,
                        status: true,
                        departureDate: true,
                        departureTime: true,
                        user: {
                            select: {
                                id: true,
                                avatar: true,
                                lastName: true,
                                firstName: true,
                                gender: true,
                                idCardStatus: true,
                                driverLicenseStatus: true,
                                rating: true,
                                preferences: true
                            }
                        },
                        vehicle: {
                            select: {
                                id: true,
                                type: true,
                                color: true,
                                numberPlate: true,
                                registrationDoc: true
                            }
                        }
                    }
                },
                stops: true
            }
        });
        return { data };
    });
}
exports.default = makeListItemInfos;
//# sourceMappingURL=list-item-infos.js.map