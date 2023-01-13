"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
function makeSaveTask({ add } = {}) {
    if (!add)
        throw new ServerError();
    return (timer, action) => (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
        return yield add('tasks', { timer, action });
    });
}
exports.default = makeSaveTask;
//# sourceMappingURL=save-task.js.map