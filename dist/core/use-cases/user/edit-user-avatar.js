"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const errors_1 = require("../../../utils/errors");
function makeEditUserAvatar({ userDb, deleteAvatarFile } = {}) {
    if (!userDb || !deleteAvatarFile)
        throw new errors_1.ServerError();
    return function editUserAvatar({ id, file } = {}) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (!id)
                throw new errors_1.MissingParamError('id');
            if (!file || file == {})
                throw new errors_1.MissingParamError('file');
            const user = yield userDb.findFirst({ where: { id }, select: { avatar: true } });
            if (user.avatar)
                deleteAvatarFile(user.avatar);
            const avatar = file.path.substring(file.path.indexOf("/"));
            userDb.updateOne({ where: { id }, data: { avatar } });
            const message = { text: 'response.edit.' };
            return { message, avatar };
        });
    };
}
exports.default = makeEditUserAvatar;
//# sourceMappingURL=edit-user-avatar.js.map