"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
function makeDeleteAvatar({ deleteFile } = {}) {
    return function deleteAvatar({ file } = {}) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            return yield deleteFile(file);
        });
    };
}
exports.default = makeDeleteAvatar;
//# sourceMappingURL=delete-avatar-file.js.map