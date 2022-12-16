"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const query_1 = tslib_1.__importDefault(require("./query"));
class UserDb extends query_1.default {
    constructor() {
        super('user');
    }
}
exports.default = UserDb;
//# sourceMappingURL=user-db.js.map