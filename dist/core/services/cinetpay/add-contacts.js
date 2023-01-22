"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeAddCinetpayContacts = void 0;
const tslib_1 = require("tslib");
const server_error_1 = require("./../../../utils/errors/server-error");
const url_1 = (0, tslib_1.__importDefault)(require("url"));
const makeAddCinetpayContacts = ({ axios, cinetpayLogin } = {}) => {
    return ({ phone, prefix, lastName, firstName, email, }) => (0, tslib_1.__awaiter)(void 0, void 0, void 0, function* () {
        try {
            const token = yield cinetpayLogin();
            console.log(token);
            if (!token)
                throw new server_error_1.ServerError();
            console.log(prefix, phone);
            const name = firstName + ' ' + lastName;
            const params = new url_1.default.URLSearchParams();
            if (!email)
                email = "noemail@molory.com";
            const q = [{ prefix, phone, name, email, surname: firstName }];
            params.append('data', JSON.stringify(q));
            const { data } = yield axios
                .post(`https://client.cinetpay.com/v1/transfer/contact?token=${token}`, params);
            return data.code == 0 ? true : false;
        }
        catch (err) {
            console.log(err.response.data);
            return null;
        }
    });
};
exports.makeAddCinetpayContacts = makeAddCinetpayContacts;
//# sourceMappingURL=add-contacts.js.map