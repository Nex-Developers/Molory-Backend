"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const ejs_1 = (0, tslib_1.__importDefault)(require("ejs"));
const path_1 = (0, tslib_1.__importDefault)(require("path"));
const express_1 = (0, tslib_1.__importDefault)(require("express"));
const middlewares_1 = require("../middlewares");
exports.default = app => {
    app.disable('x-powered-by');
    app.use(middlewares_1.cors);
    app.use(middlewares_1.jsonParser);
    app.use(middlewares_1.contentType);
    app.use(express_1.default.static('public'));
    app.engine('.html', ejs_1.default.renderFile);
    app.set('view engine', 'ejs');
    app.set('views', path_1.default.join(__dirname, '../../../views/'));
};
//# sourceMappingURL=setup.js.map