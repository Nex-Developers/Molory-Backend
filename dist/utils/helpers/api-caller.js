"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const axios_1 = tslib_1.__importDefault(require("axios"));
class ApiCaller {
    static read(url, req) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const headers = {
                'Content-Type': 'application/json',
            };
            try {
                const { data } = yield axios_1.default.get(url, { headers, data: req });
                return data;
            }
            catch (err) {
            }
        });
    }
    static send(url, req) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const headers = {
                'Content-Type': 'application/json',
            };
            try {
                const { data } = yield axios_1.default.post(url, req, { headers });
                return data;
            }
            catch (err) {
                console.log('error', err.message);
            }
        });
    }
}
exports.default = ApiCaller;
//# sourceMappingURL=api-caller.js.map