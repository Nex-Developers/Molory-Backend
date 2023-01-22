"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeGetCinetpayBalance = void 0;
const tslib_1 = require("tslib");
const makeGetCinetpayBalance = ({ axios, cinetpayLogin } = {}) => {
    return () => (0, tslib_1.__awaiter)(void 0, void 0, void 0, function* () {
        try {
            const token = yield cinetpayLogin();
            if (!token)
                return;
            const { data } = yield axios
                .get(`https://client.cinetpay.com/v1/transfer/check/balance?token=${token}`);
            console.log(data);
            const balance = data.data[0][0].available;
            return balance;
        }
        catch (err) {
            console.log(err.message);
            return null;
        }
    });
};
exports.makeGetCinetpayBalance = makeGetCinetpayBalance;
//# sourceMappingURL=get-balance.js.map