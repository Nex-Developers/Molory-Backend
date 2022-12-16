"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const cron = tslib_1.__importStar(require("node-cron"));
exports.default = () => {
    return ({ timer, interval, action }) => {
        cron.schedule(timer, () => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
            action();
        }), { interval });
    };
};
//# sourceMappingURL=add-task.js.map