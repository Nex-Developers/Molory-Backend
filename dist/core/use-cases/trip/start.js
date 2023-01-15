"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const errors_1 = require("../../../utils/errors");
const helpers_1 = require("../../../utils/helpers");
exports.default = ({ notifyDevice, addTask }) => {
    if (!notifyDevice || !addTask)
        throw new errors_1.ServerError();
    return ({ id }) => (0, tslib_1.__awaiter)(void 0, void 0, void 0, function* () {
        const prisma = helpers_1.DbConnection.prisma;
        return yield prisma.$transaction(() => (0, tslib_1.__awaiter)(void 0, void 0, void 0, function* () {
            const { status, startedAt } = yield prisma.trip.findUnique({ where: { id }, select: { status: true, startedAt: true } });
            if (status !== 3)
                throw new errors_1.AlreadyDoneError(startedAt === null || startedAt === void 0 ? void 0 : startedAt.toString());
            yield prisma.trip.update({ where: { id }, data: { status: 2, startedAt: new Date() } });
            yield prisma.travel.updateMany({ where: { route: { tripId: id }, status: { gt: 1 } }, data: { status: 2 } });
            const message = { text: "response.edit" };
            return { message };
        }));
    });
};
//# sourceMappingURL=start.js.map