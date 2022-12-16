"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
function makeUploadAvatar({ upload } = {}) {
    return function uploadAvatar({ file } = {}) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const data = yield upload(file);
            console.log(data);
            return data;
        });
    };
}
exports.default = makeUploadAvatar;
//# sourceMappingURL=upload-avatar.js.map