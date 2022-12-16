"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const query_1 = tslib_1.__importDefault(require("./query"));
class DeviceDb extends query_1.default {
    constructor() {
        super('device');
    }
}
exports.default = DeviceDb;
//# sourceMappingURL=device-db.js.map