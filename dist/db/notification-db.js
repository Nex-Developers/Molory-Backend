"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const query_1 = tslib_1.__importDefault(require("./query"));
class NotificationDb extends query_1.default {
    constructor() {
        super('notification');
    }
}
exports.default = NotificationDb;
//# sourceMappingURL=notification-db.js.map