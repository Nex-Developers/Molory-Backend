"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = (0, tslib_1.__importDefault)(require("express"));
const api_1 = (0, tslib_1.__importDefault)(require("../../routes/api"));
const web_1 = (0, tslib_1.__importDefault)(require("../../routes/web"));
exports.default = app => {
    const webRouter = (0, web_1.default)(express_1.default.Router());
    webRouter.use('/api', (0, api_1.default)(express_1.default.Router({ mergeParams: true })));
    app.use('/', webRouter);
};
//# sourceMappingURL=routes.js.map