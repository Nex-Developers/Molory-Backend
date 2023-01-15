"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const errors_1 = require("../../../utils/errors");
const helpers_1 = require("../../../utils/helpers");
exports.default = ({ notifyDevice }) => {
    if (!notifyDevice)
        throw new errors_1.ServerError();
    return ({ id, travelId }) => (0, tslib_1.__awaiter)(void 0, void 0, void 0, function* () {
        const prisma = helpers_1.DbConnection.prisma;
        return yield prisma.$transaction(() => (0, tslib_1.__awaiter)(void 0, void 0, void 0, function* () {
            const { status } = yield prisma.trip.findUnique({ where: { id }, select: { status: true } });
            if (status > 2)
                throw new errors_1.UnauthorizedError();
            yield prisma.travel.update({ where: { id: travelId }, data: { status: 4 } });
            const message = { text: "response.edit" };
            return { message };
        }));
    });
};
//# sourceMappingURL=report-missing-passenger.js.map