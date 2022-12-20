"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
function makeSaveNotification({ addInCollection } = {}) {
    return ({ receiversIds, notification } = {}) => (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
        return receiversIds.forEach((receiverId) => (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            return yield addInCollection('users', receiverId.toString(), 'notifications', notification);
        }));
    });
}
exports.default = makeSaveNotification;
//# sourceMappingURL=save-notification.js.map