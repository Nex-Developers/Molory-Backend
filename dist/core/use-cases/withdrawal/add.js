"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const unauthorized_error_1 = require("./../../../utils/errors/unauthorized-error");
const errors_1 = require("../../../utils/errors");
function makeAdd({ withdrawalDb, walletDb } = {}) {
    if (!withdrawalDb || !walletDb)
        throw new errors_1.ServerError();
    return ({ userId, walletId, type, method, amount, accessNumber, } = {}) => (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
        if (!walletId)
            throw new errors_1.MissingParamError('walletId');
        if (!type)
            throw new errors_1.MissingParamError('type');
        if (!method)
            throw new errors_1.MissingParamError('method');
        if (!amount)
            throw new errors_1.MissingParamError('amount');
        if (!accessNumber)
            throw new errors_1.MissingParamError('access number');
        const wallet = yield walletDb.findOne({ where: { id: walletId } });
        if (wallet.userId !== userId)
            throw new unauthorized_error_1.UnauthorizedError();
        if (wallet.amount < amount)
            throw new unauthorized_error_1.UnauthorizedError();
        const { id } = yield withdrawalDb.insertOne({ data: { walletId, type, method, amount, accessNumber } });
        const message = { text: "response.add" };
        return { message, id };
    });
}
exports.default = makeAdd;
//# sourceMappingURL=add.js.map