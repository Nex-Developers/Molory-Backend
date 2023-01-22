"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeCinetpayLogin = void 0;
const tslib_1 = require("tslib");
const url_1 = (0, tslib_1.__importDefault)(require("url"));
const makeCinetpayLogin = ({ axios } = {}) => {
    return () => (0, tslib_1.__awaiter)(void 0, void 0, void 0, function* () {
        try {
            const params = new url_1.default.URLSearchParams();
            params.append('apikey', '202727395961cc8f44680c85.81568028');
            params.append('password', '$cAX5tX$g4CAQb5H');
            const { data } = yield axios
                .post('https://client.cinetpay.com/v1/auth/login', params);
            const token = data.data.token;
            console.log(token);
            return token;
        }
        catch (err) {
            console.log(err.message);
            return null;
        }
    });
};
exports.makeCinetpayLogin = makeCinetpayLogin;
//# sourceMappingURL=login.js.map