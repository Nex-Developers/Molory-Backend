"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeCinetpayTransfert = void 0;
const tslib_1 = require("tslib");
const server_error_1 = require("./../../../utils/errors/server-error");
const url_1 = (0, tslib_1.__importDefault)(require("url"));
const makeCinetpayTransfert = ({ axios, cinetpayLogin } = {}) => {
    return ({ id, prefix, phone, amount, path }) => (0, tslib_1.__awaiter)(void 0, void 0, void 0, function* () {
        try {
            const token = yield cinetpayLogin();
            if (!token)
                throw new server_error_1.ServerError();
            console.log(prefix, phone);
            const params = new url_1.default.URLSearchParams();
            const q = [{ prefix, phone, amount, notify_url: 'https://molory.xyz/backend/api/' + path, client_transaction_id: id }];
            params.append('data', JSON.stringify(q));
            const { data } = yield axios
                .post(`https://client.cinetpay.com/v1/transfer/money/send/contact?token=${token}`, params);
            console.log(data.data[0][0]);
            return data.code == 0 ? data.data[0][0].transaction_id : false;
        }
        catch (err) {
            console.log(err.response.data);
            return null;
        }
    });
};
exports.makeCinetpayTransfert = makeCinetpayTransfert;
//# sourceMappingURL=transfert.js.map