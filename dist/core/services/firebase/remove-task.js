"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
function makeRemoveTask({ delete:  } = {}) {
    if (!delete )
        throw new ServerError();
    return (id) => (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
        return yield delete ('tasks', id);
    });
}
exports.default = makeRemoveTask;
//# sourceMappingURL=remove-task.js.map