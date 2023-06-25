"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const errors_1 = require("../../../utils/errors");
function makeConfirm({ verifyTransaction, getByDoc, updateDoc, confirmTravel } = {}) {
    if (!verifyTransaction || !getByDoc || !updateDoc || !confirmTravel)
        throw new errors_1.ServerError();
    return ({ id, status } = {}) => (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
        if (!id)
            throw new errors_1.MissingParamError('id');
        if (!status)
            throw new errors_1.MissingParamError('status');
        console.log(id, status);
        const res = yield verifyTransaction(+id);
        console.log('payment res', res);
        yield updateDoc('payments', 'payment-' + id, { status: res ? 1 : 0 });
        if (res) {
            const payment = yield getByDoc('payments', 'payment-' + id);
            console.log(payment);
            const data = yield confirmTravel({ id: payment.paymentId, status: payment.status, amount: payment.amount, method: 'fedapay', reference: payment.id, validatedAt: payment.updatedAt });
            return data;
        }
        else {
            const message = { text: "Echec de paiement" };
            return { message };
        }
    });
}
exports.default = makeConfirm;
//# sourceMappingURL=confirm.js.map