"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notifyDevice = void 0;
const tslib_1 = require("tslib");
const helpers_1 = require("../../../utils/helpers");
const firebase_admin_1 = tslib_1.__importDefault(require("../../../utils/helpers/firebase-admin"));
const notify_device_1 = tslib_1.__importDefault(require("./notify-device"));
const notifyDevice = (0, notify_device_1.default)({ sendNotification: firebase_admin_1.default.sendNotification, translate: helpers_1.LanguageManager.translate });
exports.notifyDevice = notifyDevice;
//# sourceMappingURL=index.js.map