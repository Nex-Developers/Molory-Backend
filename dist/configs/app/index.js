"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const setup_1 = tslib_1.__importDefault(require("./setup"));
const routes_1 = tslib_1.__importDefault(require("./routes"));
const app = (0, express_1.default)();
(0, setup_1.default)(app);
(0, routes_1.default)(app);
exports.default = app;
//# sourceMappingURL=index.js.map