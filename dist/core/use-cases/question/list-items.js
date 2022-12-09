"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const errors_1 = require("../../../utils/errors");
exports.default = ({ questionDb }) => {
    if (!questionDb)
        throw new errors_1.ServerError();
    return ({ role }) => (0, tslib_1.__awaiter)(void 0, void 0, void 0, function* () {
        const select = {
            id: true,
            value: true,
            createdAt: true,
            answers: {
                select: {
                    id: true,
                    value: true,
                    createdAt: true
                }
            }
        };
        if (role === "admin")
            select.answers.select._count = { select: { preferences: true } };
        const data = yield questionDb.findMany({
            select
        });
        return { data };
    });
};
//# sourceMappingURL=list-items.js.map