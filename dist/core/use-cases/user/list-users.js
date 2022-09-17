"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const errors_1 = require("../../../utils/errors");
function makeListUsers({ userDb } = {}) {
    if (!userDb)
        throw new errors_1.ServerError();
    return function listUsers({ startAt, limit } = {}) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            if (!startAt)
                startAt = 0;
            if (!limit)
                limit = 100;
            const data = yield userDb.findMany({ startAt, limit, orderBy: { role: 'asc' }, select: {
                    id: true,
                    avatar: true,
                    lastName: true,
                    firstName: true,
                    phoneNumber: true,
                    gender: true,
                    email: true,
                    birthDay: true,
                    createdAt: true,
                    blockedAt: true,
                    role: true
                } });
            return { data, count: data.length, startAt, limit };
        });
    };
}
exports.default = makeListUsers;
//# sourceMappingURL=list-users.js.map