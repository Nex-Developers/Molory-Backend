"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeAddCinetpayContacts = void 0;
const tslib_1 = require("tslib");
const server_error_1 = require("./../../../utils/errors/server-error");
const makeAddCinetpayContacts = ({ axios, cinetpayLogin } = {}) => {
    return ({ phoneNumber, lastName, firstName, email, }) => (0, tslib_1.__awaiter)(void 0, void 0, void 0, function* () {
        try {
            const token = yield cinetpayLogin;
            if (!token)
                throw new server_error_1.ServerError();
            const prefix = phoneNumber.substring(0, 3);
            const phone = phoneNumber.substring(3, phoneNumber.length);
            console.log(prefix, phone);
            const name = firstName + ' ' + lastName;
            const { data } = yield axios
                .post('https://client.cinetpay.com/v1/transfer/check/balance', {
                token,
                lang: 'en',
                data: {
                    prefix,
                    phone,
                    name,
                    surname: '',
                    email
                }
            });
            console.log(data);
            return true;
        }
        catch (err) {
            console.log(err.message);
            return null;
        }
    });
};
exports.makeAddCinetpayContacts = makeAddCinetpayContacts;
//# sourceMappingURL=add-contacts.js.map