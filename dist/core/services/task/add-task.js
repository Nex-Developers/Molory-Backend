"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const cron = (0, tslib_1.__importStar)(require("node-cron"));
exports.default = () => {
    return ({ timer, action }) => (0, tslib_1.__awaiter)(void 0, void 0, void 0, function* () {
        cron.schedule(timer, () => (0, tslib_1.__awaiter)(void 0, void 0, void 0, function* () {
            action();
        }));
    });
};
//# sourceMappingURL=add-task.js.map