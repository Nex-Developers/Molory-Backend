"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const errors_1 = require("../../../utils/errors");
const moment_1 = tslib_1.__importDefault(require("moment"));
function makeListUsers({ userDb } = {}) {
    if (!userDb)
        throw new errors_1.ServerError();
    return function listUsers({ startAt, limit } = {}) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (!startAt)
                startAt = 0;
            if (!limit)
                limit = 100;
            const data = yield userDb.findMany({
                startAt, limit, orderBy: { role: 'asc' }, select: {
                    id: true,
                    avatar: true,
                    lastName: true,
                    firstName: true,
                    phoneNumber: true,
                    gender: true,
                    email: true,
                    signUpMethod: true,
                    birthDay: true,
                    createdAt: true,
                    blockedAt: true,
                    role: true
                }
            });
            data.map(item => {
                if (item.birthDay)
                    item.birthDay = (0, moment_1.default)(item.birthDay).format('DD-MM-YYYY');
                if (item.createdAt)
                    item.createdAt = (0, moment_1.default)(item.createdAt).format('DD-MM-YYYY');
                return item;
            });
            return { data, count: data.length, startAt, limit };
        });
    };
}
exports.default = makeListUsers;
//# sourceMappingURL=list-users.js.map