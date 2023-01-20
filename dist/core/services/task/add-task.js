"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const environment_1 = require("../../../configs/environment");
exports.default = ({ send }) => {
    return ({ timer, path, params }) => (0, tslib_1.__awaiter)(void 0, void 0, void 0, function* () {
        return yield send(environment_1.env.taskUrl, { timer, path, params });
    });
};
//# sourceMappingURL=add-task.js.map