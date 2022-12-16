"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const errors_1 = require("../../../utils/errors");
function makeListRemovedUsers({ userDb } = {}) {
    if (!userDb)
        throw new errors_1.ServerError();
    return function listRemovedUsers({ startAt, limit } = {}) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (!startAt)
                startAt = 0;
            if (!limit)
                limit = 100;
            const data = yield userDb.findManyInTrash({
                startAt,
                limit,
                select: {
                    id: true,
                    avatar: true,
                    lastName: true,
                    firstName: true,
                    phoneNumber: true,
                    email: true,
                    birthDay: true,
                    createdAt: true,
                    deletedAt: true,
                    role: true
                }
            });
            return { data, count: data.length, startAt, limit };
        });
    };
}
exports.default = makeListRemovedUsers;
//# sourceMappingURL=list-removed-users.js.map