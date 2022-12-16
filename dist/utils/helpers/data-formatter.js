"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const ejs_1 = tslib_1.__importDefault(require("ejs"));
const path_1 = tslib_1.__importDefault(require("path"));
const _1 = require(".");
const environment_1 = require("../../configs/environment");
class DataFormatter {
    static ejsToHtml(file, params, lang) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const _this = DataFormatter;
            params = _this.translateParams(params, lang);
            return yield ejs_1.default.renderFile(path_1.default.join(__dirname, _this.viewsFolder + file), params, { async: true });
        });
    }
    static translateParams(params, lang) {
        if (!lang)
            lang = environment_1.env.lang.default;
        Object.keys(params).map((key, index) => {
            if (params[key].text)
                params[key] = _1.LanguageManager.translate(lang, params[key].text, params[key].params);
        });
        return params;
    }
}
exports.default = DataFormatter;
DataFormatter.viewsFolder = '../../../views/';
//# sourceMappingURL=data-formatter.js.map