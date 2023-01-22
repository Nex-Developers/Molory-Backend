"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeCheckCinetpayTransfert = void 0;
const tslib_1 = require("tslib");
const makeCheckCinetpayTransfert = ({ axios, cinetpayLogin } = {}) => {
    return ({ id }) => (0, tslib_1.__awaiter)(void 0, void 0, void 0, function* () {
        try {
            const token = yield cinetpayLogin();
            if (!token)
                return;
            const { data } = yield axios
                .get(`https://client.cinetpay.com/v1/transfer/check/money?token=${token}&transaction_id=${id}`);
            let res;
            if (data.code == 0)
                res = data.data[0];
            return res;
        }
        catch (err) {
            console.log(err.message);
            return null;
        }
    });
};
exports.makeCheckCinetpayTransfert = makeCheckCinetpayTransfert;
//# sourceMappingURL=check-transfert.js.map