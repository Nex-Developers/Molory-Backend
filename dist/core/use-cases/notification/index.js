"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setAsSeen = exports.listNotifications = void 0;
const tslib_1 = require("tslib");
const db_1 = require("../../../db");
const list_items_1 = tslib_1.__importDefault(require("./list-items"));
const set_as_seen_1 = tslib_1.__importDefault(require("./set-as-seen"));
const publicationDb = new db_1.PublicationDb();
const notificationDb = new db_1.NotificationDb();
const listNotifications = (0, list_items_1.default)({ notificationDb });
exports.listNotifications = listNotifications;
const setAsSeen = (0, set_as_seen_1.default)({ publicationDb });
exports.setAsSeen = setAsSeen;
//# sourceMappingURL=index.js.map