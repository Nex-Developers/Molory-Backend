"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const errors_1 = require("../../../utils/errors");
function makeSave({ createTransaction, createWithdrawTransaction, set } = {}) {
    if (!createTransaction || !set)
        throw new errors_1.ServerError();
    return ({ id, amount, firstName, lastName, email = "", phoneNumber = "", type, method, params = {} }) => (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
        if (!id)
            throw new errors_1.MissingParamError("id");
        if (!type)
            throw new errors_1.InvalidParamError("type");
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
        let transactionId = 'trans-' + id;
        let operation;
        const data = Object.assign({ firstName, lastName, email, phoneNumber, amount, ref: id, transactionId: id, type, status: 2 }, params);
        if (type === 'recharge') {
            operation = yield createTransaction(amount, firstName, lastName, email, phoneNumber);
            transactionId = 'trans-' + operation.transactionId;
            data.ref = operation.transactionId;
            data.url = operation.url;
        }
        else if (type === 'withdraw') {
            operation = yield createWithdrawTransaction(amount, firstName, lastName, email, phoneNumber);
            transactionId = 'trans-' + operation.id;
            data.ref = operation.transactionId;
        }
        else if (type === 'payment' && method === 'wallet') {
        }
        else if (type === 'payment' && method !== 'wallet') {
            operation = yield createTransaction(amount, firstName, lastName, email, phoneNumber);
            transactionId = 'trans-' + operation.transactionId;
            data.ref = operation.transactionId;
            data.url = operation.url;
        }
        yield set('transactions', transactionId, data);
        return { url: data.url, transactionId: data.ref };
    });
}
exports.default = makeSave;
//# sourceMappingURL=save.js.map