"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const xlsx_1 = tslib_1.__importDefault(require("xlsx"));
const environment_1 = require("../../configs/environment");
class LogManager {
    static save(data) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const file = yield LogManager.getDataFile();
            if (!file)
                return;
            const date = new Date();
            const sheetName = date.getFullYear().toString() + "_" + (date.getMonth() + 1).toString();
            let ws = file.Sheets[sheetName];
            if (ws) {
                const result = xlsx_1.default.utils.sheet_to_json(ws);
                result.push(data);
                ws = xlsx_1.default.utils.sheet_add_json(ws, result);
                file.Sheets[sheetName] = ws;
            }
            else {
                console.log(' new sheet exist');
                ws = xlsx_1.default.utils.json_to_sheet([data]);
                xlsx_1.default.utils.book_append_sheet(file, ws, sheetName);
            }
            xlsx_1.default.writeFile(file, environment_1.env.logs.file);
        });
    }
    static getByUser(userId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const file = yield LogManager.getDataFile();
            if (!file)
                return [];
            const sheets = [...file.SheetNames, 'home'];
            const result = [];
            sheets.forEach(sheetName => {
                const data = xlsx_1.default.utils.sheet_to_json(file.Sheets[sheetName]);
                data.forEach(item => {
                    if (item.userId === userId)
                        result.unshift(item);
                });
            });
            return result;
        });
    }
    static read(limit = 20, where) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const file = xlsx_1.default.readFile(environment_1.env.logs.file);
            if (!file)
                return [];
            const data = [];
            const sheets = [...file.SheetNames, 'home'];
            for (let i = 0; i < sheets.length; i++) {
                const temp = xlsx_1.default.utils.sheet_to_json(file.Sheets[file.SheetNames[i]]);
                temp.forEach((res) => {
                    if (!where)
                        data.unshift(res);
                    else {
                        const keys = Object.keys(where);
                        const matches = keys.filter(key => res[key] == where[key]);
                        if (matches.length === keys.length)
                            data.unshift(res);
                    }
                });
                if (data.length >= limit)
                    break;
            }
            return { length: data.length, data };
        });
    }
    static getDataFile() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                return yield xlsx_1.default.readFile(environment_1.env.logs.file);
            }
            catch (err) {
                if (err.code === 'ENOENT') {
                    yield LogManager.createDataFile();
                    return LogManager.getDataFile();
                }
                return;
            }
        });
    }
    static createDataFile() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const file = xlsx_1.default.utils.book_new();
            yield xlsx_1.default.utils.book_append_sheet(file, null, 'home');
            return yield xlsx_1.default.writeFile(file, environment_1.env.logs.file);
        });
    }
}
exports.default = LogManager;
//# sourceMappingURL=log-manager.js.map