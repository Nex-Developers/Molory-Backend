"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeListStats = void 0;
const tslib_1 = require("tslib");
const helpers_1 = require("../../../utils/helpers");
function makeListStats() {
    const getLastDaysDate = (num) => {
        const now = new Date();
        return new Date(now.getFullYear(), now.getMonth(), now.getDate() - num, now.getHours(), now.getMinutes());
    };
    return () => (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
        const prisma = helpers_1.DbConnection.prisma;
        const tripCount = yield prisma.trip.count({ where: { status: { gte: 1 } } });
        const travelCount = yield prisma.travel.count({ where: { status: { gte: 1 } } });
        const userCount = yield prisma.user.count();
        const monthTripCount = yield prisma.trip.count({ where: { createdAt: { gte: getLastDaysDate(30) } } });
        const monthTravelCount = yield prisma.travel.count({ where: { createdAt: { gte: getLastDaysDate(30) } } });
        const monthUserCount = yield prisma.user.count({ where: { createdAt: { gte: getLastDaysDate(30) } } });
        const transactions = yield prisma.transaction.findMany({ where: { status: 1, type: 'payment' } });
        const incomes = transactions.reduce((a, b) => a + b.amount, 0);
        const deposits = yield prisma.transaction.findMany({ where: { status: 1, type: 'deposit' } });
        const withdraws = yield prisma.transaction.findMany({ where: { status: 1, type: 'withdraw' } });
        const payout = withdraws.reduce((a, b) => a + b.amount, 0);
        const payin = deposits.reduce((a, b) => a + b.amount, 0);
        return {
            tripCount,
            travelCount,
            userCount,
            monthTripCount,
            monthTravelCount,
            monthUserCount,
            incomes,
            payout,
            payin
        };
    });
}
exports.makeListStats = makeListStats;
//# sourceMappingURL=list-stats.js.map