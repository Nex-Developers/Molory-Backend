"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const environment_1 = require("../../../configs/environment");
const errors_1 = require("../../../utils/errors");
function makeUpdateAvatar({ userDb, deleteAvatarFile, saveProfile } = {}) {
    if (!userDb || !deleteAvatarFile || !saveProfile)
        throw new errors_1.ServerError();
    return function updateAvatar({ id, file } = {}) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            if (!file || file == {})
                throw new errors_1.MissingParamError('file');
            console.log('file', file);
            const user = yield userDb.findFirst({ where: { id }, select: { avatar: true } });
            if (!user)
                throw new errors_1.InvalidParamError('token');
            if (user.avatar)
                deleteAvatarFile(user.avatar);
            const avatar = environment_1.env.url + file.path.substring(file.path.indexOf("/"));
            userDb.updateOne({ where: { id }, data: { avatar } });
            const message = { text: 'auth.message.updateAvatar' };
            saveProfile(id);
            return { message, data: { avatar } };
        });
    };
}
exports.default = makeUpdateAvatar;
//# sourceMappingURL=update-avatar.js.map