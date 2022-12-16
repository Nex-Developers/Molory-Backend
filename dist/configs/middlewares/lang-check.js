"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const environment_1 = require("../environment");
exports.default = (req, res, next) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    let lang = req.headers['lang'];
    if (!lang)
        lang = environment_1.env.lang.default;
    req.params.lang = lang;
    next();
});
//# sourceMappingURL=lang-check.js.map