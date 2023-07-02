"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const errors_1 = require("../../../utils/errors");
function makePay({ createTransaction, set } = {}) {
    if (!createTransaction || !set)
        throw new errors_1.ServerError();
    return ({ id, amount, firstName, lastName, email = "", phoneNumber = "", }) => (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
        if (!id)
            throw new errors_1.MissingParamError("id");
        if (!firstName)
            throw new errors_1.MissingParamError("firstName");
        if (!lastName)
            throw new errors_1.MissingParamError("lastName");
        if (!phoneNumber)
            throw new errors_1.MissingParamError("phoneNumber");
        if (!amount)
            throw new errors_1.MissingParamError('amount');
        if (!email)
            email = '';
        const res = yield createTransaction(amount, firstName, lastName, email, phoneNumber);
        yield set('payments', 'payment-' + res.transactionId, { firstName, lastName, email, phoneNumber, amount, url: res.url, transactionId: res.transactionId, paymentId: id, status: 2, bookingStatus: 2 });
        return res;
    });
}
exports.default = makePay;
//# sourceMappingURL=pay.js.map