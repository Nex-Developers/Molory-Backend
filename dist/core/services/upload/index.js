"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAvatarFile = exports.uploadAvatar = void 0;
const tslib_1 = require("tslib");
const helpers_1 = require("../../../utils/helpers");
const delete_avatar_file_1 = tslib_1.__importDefault(require("./delete-avatar-file"));
const upload_avatar_1 = tslib_1.__importDefault(require("./upload-avatar"));
const uploadAvatar = (0, upload_avatar_1.default)({ upload: helpers_1.FileManager.deleteFile });
exports.uploadAvatar = uploadAvatar;
const deleteAvatarFile = (0, delete_avatar_file_1.default)({ deleteFile: helpers_1.FileManager.deleteFile });
exports.deleteAvatarFile = deleteAvatarFile;
//# sourceMappingURL=index.js.map