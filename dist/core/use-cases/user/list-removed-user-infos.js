"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const errors_1 = require("../../../utils/errors");
function makeListRemovedUserInfos({ userDb } = {}) {
    if (!userDb)
        throw new errors_1.ServerError();
    return function listRemovedUserInfos({ id, } = {}) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            if (!id)
                throw new errors_1.MissingParamError('id');
            const data = yield userDb.findFirstInTrash({ where: { id }, select: {
                    id: true,
                    avatar: true,
                    lastName: true,
                    firstName: true,
                    phoneNumber: true,
                    email: true,
                    birthDay: true,
                    createdAt: true,
                    blockedAt: true,
                    deletedAt: true,
                    role: true
                } });
            return { data };
        });
    };
}
exports.default = makeListRemovedUserInfos;
//# sourceMappingURL=list-removed-user-infos.js.map