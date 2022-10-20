"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const query_1 = (0, tslib_1.__importDefault)(require("./query"));
class ReviewDb extends query_1.default {
    constructor() {
        super('review');
    }
}
exports.default = ReviewDb;
//# sourceMappingURL=review-db.js.map