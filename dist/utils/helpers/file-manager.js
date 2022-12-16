"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const fs_1 = tslib_1.__importDefault(require("fs"));
class FileManager {
    static deleteFile(path) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (fs_1.default.existsSync(path))
                yield fs_1.default.unlinkSync(__dirname + 'public' + path);
            return;
        });
    }
}
exports.default = FileManager;
//# sourceMappingURL=file-manager.js.map