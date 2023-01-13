"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
function makeGetTasks({ get } = {}) {
    if (!get)
        throw new ServerError();
    return () => (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
        return yield get('tasks');
    });
}
exports.default = makeGetTasks;
//# sourceMappingURL=get-tasks.js.map