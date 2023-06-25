"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const errors_1 = require("../../../utils/errors");
const helpers_1 = require("../../../utils/helpers");
const uuid_1 = require("uuid");
function makeRequestPayment({ pay } = {}) {
    if (!pay)
        throw new errors_1.ServerError();
    const generateUid = () => (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
        const uid = (0, uuid_1.v4)();
        return uid;
    });
    return ({ amount, customerId } = {}) => (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
        console.log(amount, customerId);
        if (!amount)
            throw new errors_1.MissingParamError('amount');
        const prisma = helpers_1.DbConnection.prisma;
        const { firstName, lastName, email, phoneNumber } = yield prisma.user.findUnique({ where: { id: customerId } });
        console.log(firstName, lastName, email, phoneNumber);
        const id = yield generateUid();
        const res = yield pay({ id, amount, firstName, lastName, email, phoneNumber });
        const message = { text: "response.add", res };
        return { message, res };
    });
}
exports.default = makeRequestPayment;
//# sourceMappingURL=request.js.map