"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const docs_1 = tslib_1.__importDefault(require("./docs"));
const web_1 = tslib_1.__importDefault(require("./web"));
exports.default = (router) => {
    router.use((0, web_1.default)());
    router.use((0, docs_1.default)());
    return router;
};
//# sourceMappingURL=index.js.map