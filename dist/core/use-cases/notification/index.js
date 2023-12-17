"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.publishNotifications = exports.setAsSeen = exports.listNotifications = void 0;
const tslib_1 = require("tslib");
const db_1 = require("../../../db");
const notifications_1 = require("../../services/notifications");
const list_items_1 = (0, tslib_1.__importDefault)(require("./list-items"));
const set_as_seen_1 = (0, tslib_1.__importDefault)(require("./set-as-seen"));
const publish_1 = (0, tslib_1.__importDefault)(require("./publish"));
const publicationDb = new db_1.PublicationDb();
const listNotifications = (0, list_items_1.default)();
exports.listNotifications = listNotifications;
const setAsSeen = (0, set_as_seen_1.default)({ publicationDb });
exports.setAsSeen = setAsSeen;
const publishNotifications = (0, publish_1.default)({ notifyUser: notifications_1.notifyUser });
exports.publishNotifications = publishNotifications;
//# sourceMappingURL=index.js.map