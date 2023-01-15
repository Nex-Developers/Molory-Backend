"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const errors_1 = require("../../../utils/errors");
const helpers_1 = require("../../../utils/helpers");
function makeConfirm({ checkCinetpayTansfert } = {}) {
    if (!checkCinetpayTansfert)
        throw new errors_1.ServerError();
    return ({ id } = {}) => (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
        if (!id)
            throw new errors_1.MissingParamError('id');
        const prisma = helpers_1.DbConnection.prisma;
        const refund = yield prisma.refund.findUnique({ where: { id } });
        if (refund.status === 2) {
            const transactionData = yield checkCinetpayTansfert({ id });
            if (!transactionData)
                return;
            if (transactionData.amount !== refund.amount) {
                console.log('transaction amount mismatch', transactionData.amount, refund.amount);
                return;
            }
            if (transactionData.status == '00') {
                yield prisma.refund.update({ where: { id }, data: { status: 1 } });
            }
        }
    });
}
exports.default = makeConfirm;
//# sourceMappingURL=confirm.js.map