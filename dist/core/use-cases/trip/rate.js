"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const helpers_1 = require("../../../utils/helpers");
exports.default = () => {
    return ({ travelId, rating, comment }) => {
        console.log('rating');
        const prisma = helpers_1.DbConnection.prisma;
        prisma.$transaction(() => (0, tslib_1.__awaiter)(void 0, void 0, void 0, function* () {
            return;
        }));
    };
};
//# sourceMappingURL=rate.js.map