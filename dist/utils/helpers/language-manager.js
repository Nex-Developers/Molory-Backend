"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const environment_1 = require("../../configs/environment");
const fs_1 = tslib_1.__importDefault(require("fs"));
class LanguageManager {
    static translate(lang, _str, params = {}) {
        if (!lang)
            lang = environment_1.env.lang.default;
        const self = LanguageManager;
        const str = _str.split('.');
        const jsonFile = environment_1.env.lang.path + lang + '.json';
        const langData = fs_1.default.readFileSync(jsonFile);
        const messages = JSON.parse(langData.toString());
        if (str.length === 2) {
            return self.setAttributes(messages[str[0]][str[1]], params);
        }
        if (str.length === 3) {
            return self.setAttributes(messages[str[0]][str[1]][str[2]], params);
        }
        return _str;
    }
    static setAttributes(str, params) {
        const self = LanguageManager;
        if (self.size(params) > 0) {
            let i = 1;
            for (const key in params) {
                const _key = new RegExp(':' + key, 'g');
                str = str.replace(_key, params[key]);
                if (i == self.size(params)) {
                    return str;
                }
                i++;
            }
        }
        return str;
    }
    static size(obj) {
        let size = 0, key;
        for (key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key))
                size++;
        }
        return size;
    }
}
exports.default = LanguageManager;
//# sourceMappingURL=language-manager.js.map