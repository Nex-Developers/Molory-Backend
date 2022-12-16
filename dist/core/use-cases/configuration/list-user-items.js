"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
function makeListItems({ configurationDb } = {}) {
    return ({ id } = {}) => tslib_1.__awaiter(this, void 0, void 0, function* () {
        const data = yield configurationDb.findFirst({
            where: {
                userId: id
            },
            select: {
                prefernceId: true,
                userId: true,
                value: true,
                createdAt: true
            }
        });
        return { data };
    });
}
exports.default = makeListItems;
//# sourceMappingURL=list-user-items.js.map