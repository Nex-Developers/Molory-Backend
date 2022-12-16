"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const errors_1 = require("../../../utils/errors");
function makeConfirm({ withdrawalDb } = {}) {
    if (!withdrawalDb)
        throw new errors_1.ServerError();
    return ({ id, amount, status } = {}) => tslib_1.__awaiter(this, void 0, void 0, function* () {
        if (!id)
            throw new errors_1.MissingParamError('id');
        if (!amount)
            throw new errors_1.MissingParamError('amount');
        const withDrawal = yield withdrawalDb.findFirst({ where: { id } });
        if (withDrawal.amount != amount)
            throw new errors_1.MissingParamError('amount');
        let validationStatus = 0;
        if (status === "00")
            validationStatus = 1;
        yield withdrawalDb.updateOne({ where: { id }, data: { status: validationStatus } });
        const message = { text: "response.edit" };
        return { message };
    });
}
exports.default = makeConfirm;
//# sourceMappingURL=confirm.js.map