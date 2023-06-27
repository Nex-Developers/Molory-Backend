"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const errors_1 = require("../../../utils/errors");
function makeConfirm({ decriptEvent, verifyTransaction, getByDoc, updateDoc, confirmTravel } = {}) {
    if (!decriptEvent || !verifyTransaction || !getByDoc || !updateDoc || !confirmTravel)
        throw new errors_1.ServerError();
    return ({ token, body } = {}) => (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
        if (!token)
            throw new errors_1.MissingParamError('token');
        if (!body)
            throw new errors_1.MissingParamError('body');
        console.log(token, body);
        const event = decriptEvent(body, token);
        const res = yield verifyTransaction(event.id || event.transaction_id);
        console.log('payment res', res);
        yield updateDoc('payments', 'payment-' + event.id, { status: res ? 1 : 0 });
        if (res) {
            const payment = yield getByDoc('payments', 'payment-' + event.id);
            console.log(payment);
            yield confirmTravel({ id: payment.paymentId, status: payment.status, amount: payment.amount, method: 'fedapay', reference: payment.id, validatedAt: payment.updatedAt });
            return { recieved: false };
        }
        else {
            const message = { recieved: true };
            return { message };
        }
    });
}
exports.default = makeConfirm;
//# sourceMappingURL=confirm.js.map