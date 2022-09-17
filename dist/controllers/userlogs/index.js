"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserLogsController = exports.getLogsController = void 0;
const tslib_1 = require("tslib");
const get_logs_1 = (0, tslib_1.__importDefault)(require("./get-logs"));
const get_user_logs_1 = (0, tslib_1.__importDefault)(require("./get-user-logs"));
const getLogsController = (0, get_logs_1.default)();
exports.getLogsController = getLogsController;
const getUserLogsController = (0, get_user_logs_1.default)();
exports.getUserLogsController = getUserLogsController;
//# sourceMappingURL=index.js.map