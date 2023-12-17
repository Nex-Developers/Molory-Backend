"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const helpers_1 = require("../../../utils/helpers");
exports.default = () => {
    return () => (0, tslib_1.__awaiter)(void 0, void 0, void 0, function* () {
        const prisma = helpers_1.DbConnection.prisma;
        const data = yield prisma.publication.findMany({
            select: {
                title: true,
                message: true,
                createdAt: true,
                user: true,
                notifications: true
            },
            orderBy: { id: 'desc' }
        });
        return { data };
    });
};
//# sourceMappingURL=list-items.js.map