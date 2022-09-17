"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const query_1 = (0, tslib_1.__importDefault)(require("./query"));
class PreferenceDb extends query_1.default {
    constructor() {
        super('preference');
    }
}
exports.default = PreferenceDb;
//# sourceMappingURL=preference-db.js.map