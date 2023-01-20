"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addTask = void 0;
const tslib_1 = require("tslib");
const helpers_1 = require("../../../utils/helpers");
const add_task_1 = (0, tslib_1.__importDefault)(require("./add-task"));
const addTask = (0, add_task_1.default)({ send: helpers_1.ApiCaller.send });
exports.addTask = addTask;
//# sourceMappingURL=index.js.map