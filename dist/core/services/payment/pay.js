"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const errors_1 = require("../../../utils/errors");
function makePay({ createTransaction } = {}) {
    if (!createTransaction)
        throw new errors_1.ServerError();
    return ({ amount, firstName, lastName, email, phoneNumber, }) => (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
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
        return yield createTransaction(amount, firstName, lastName, email, phoneNumber);
    });
}
exports.default = makePay;
//# sourceMappingURL=pay.js.map