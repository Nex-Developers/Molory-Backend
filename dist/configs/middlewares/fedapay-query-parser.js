"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
exports.default = (req, res, next) => (0, tslib_1.__awaiter)(void 0, void 0, void 0, function* () {
    const token = req.headers['x-fedapay-signature'];
    req.params = { token };
    next();
});
//# sourceMappingURL=fedapay-query-parser.js.map