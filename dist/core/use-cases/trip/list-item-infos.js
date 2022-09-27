"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const errors_1 = require("../../../utils/errors");
function makeListItemInfos({ tripDb } = {}) {
    if (!tripDb)
        throw new errors_1.ServerError();
    return ({ id } = {}) => (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
        if (!id)
            throw new errors_1.MissingParamError('id');
        const data = yield tripDb.findFirst({
            where: {
                id: true
            },
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
                        firstName: true,
                        lastName: true,
                        phoneNumber: true
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
                },
                routes: {
                    select: {
                        id: true,
                        distance: true,
                        duration: true,
                        price: true,
                        stops: true,
                        travels: {
                            select: {
                                seats: true,
                                status: true,
                                createdAt: true,
                                user: {
                                    select: {
                                        id: true,
                                        avatar: true,
                                        firstName: true,
                                        lastName: true,
                                        phoneNumber: true
                                    }
                                },
                            }
                        }
                    }
                },
                createdAt: true
            }
        });
        return { data };
    });
}
exports.default = makeListItemInfos;
//# sourceMappingURL=list-item-infos.js.map