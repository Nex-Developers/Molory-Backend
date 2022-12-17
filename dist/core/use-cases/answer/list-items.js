"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const errors_1 = require("../../../utils/errors");
exports.default = ({ answerDb }) => {
    if (!answerDb)
        throw new errors_1.ServerError();
    return ({ role }) => (0, tslib_1.__awaiter)(void 0, void 0, void 0, function* () {
        const select = {
            value: true,
            index: true,
            createdAt: true,
            question: {
                select: {
                    value: true,
                    createdAt: true
                }
            }
        };
        if (role === "admin")
            select._count = { select: { preferences: true } };
        const data = yield answerDb.findMany({
            select
        });
        return { data };
    });
};
//# sourceMappingURL=list-items.js.map