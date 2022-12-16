"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listUserConfigurations = exports.setConfiguration = void 0;
const tslib_1 = require("tslib");
const db_1 = require("../../../db");
const set_1 = tslib_1.__importDefault(require("./set"));
const list_user_items_1 = tslib_1.__importDefault(require("./list-user-items"));
const userDb = new db_1.UserDb();
const setConfiguration = (0, set_1.default)({ userDb });
exports.setConfiguration = setConfiguration;
const listUserConfigurations = (0, list_user_items_1.default)({ userDb });
exports.listUserConfigurations = listUserConfigurations;
//# sourceMappingURL=index.js.map