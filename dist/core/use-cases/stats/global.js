"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const helpers_1 = require("../../../utils/helpers");
exports.default = () => {
    const getLastDaysDate = (num) => {
        const now = new Date();
        return new Date(now.getFullYear(), now.getMonth(), now.getDate() - num, now.getHours(), now.getMinutes());
    };
    return () => (0, tslib_1.__awaiter)(void 0, void 0, void 0, function* () {
        const prisma = helpers_1.DbConnection.prisma;
        const tripCount = yield prisma.trip.count({ where: { status: { gte: 1 } } });
        const travelCount = yield prisma.travel.count({ where: { status: { gte: 1 } } });
        const userCount = yield prisma.user.count();
        const monthTripCount = yield prisma.trip.count({ where: { createdAt: { gte: getLastDaysDate(30) } } });
        const monthTravelCount = yield prisma.travel.count({ where: { createdAt: { gte: getLastDaysDate(30) } } });
        const monthUserCount = yield prisma.user.count({ where: { createdAt: { gte: getLastDaysDate(30) } } });
        return {
            tripCount,
            travelCount,
            userCount,
            monthTripCount,
            monthTravelCount,
            monthUserCount
        };
    });
};
//# sourceMappingURL=global.js.map