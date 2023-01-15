"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeCinetpayLogin = void 0;
const tslib_1 = require("tslib");
const makeCinetpayLogin = ({ axios } = {}) => {
    return () => (0, tslib_1.__awaiter)(void 0, void 0, void 0, function* () {
        try {
            const { data } = yield axios
                .post('https://client.cinetpay.com/v1/auth/login', {
                apiKey: '202727395961cc8f44680c85.81568028',
                password: '$cAX5tX$g4CAQb5H'
            });
            console.log(data);
            const token = data.data.token;
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