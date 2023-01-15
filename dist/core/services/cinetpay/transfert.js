"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeCinetpayTransfert = void 0;
const tslib_1 = require("tslib");
const server_error_1 = require("./../../../utils/errors/server-error");
const makeCinetpayTransfert = ({ axios, cinetpayLogin } = {}) => {
    return ({ id, phoneNumber, amount }) => (0, tslib_1.__awaiter)(void 0, void 0, void 0, function* () {
        try {
            const token = yield cinetpayLogin;
            if (!token)
                throw new server_error_1.ServerError();
            const prefix = phoneNumber.substring(0, 3);
            const phone = phoneNumber.substring(3, phoneNumber.length);
            console.log(prefix, phone);
            const { data } = yield axios
                .post('https://client.cinetpay.com/v1/transfer/money/send/contact', {
                token,
                lang: 'en',
                data: {
                    prefix,
                    phone,
                    amount,
                    notify_url: '/' + id,
                    client_transaction_id: id
                }
            });
            console.log(data);
            const balance = data.data.available;
            return balance;
        }
        catch (err) {
            console.log(err.message);
            return null;
        }
    });
};
exports.makeCinetpayTransfert = makeCinetpayTransfert;
//# sourceMappingURL=transfert.js.map