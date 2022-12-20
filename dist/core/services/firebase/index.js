"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveProfile = exports.saveNotification = void 0;
const tslib_1 = require("tslib");
const helpers_1 = require("../../../utils/helpers");
const save_notification_1 = (0, tslib_1.__importDefault)(require("./save-notification"));
const save_profile_1 = (0, tslib_1.__importDefault)(require("./save-profile"));
const saveNotification = (0, save_notification_1.default)({ addInCollection: helpers_1.FirestoreDb.addInCollection });
exports.saveNotification = saveNotification;
const saveProfile = (0, save_profile_1.default)({ set: helpers_1.FirestoreDb.set });
exports.saveProfile = saveProfile;
//# sourceMappingURL=index.js.map