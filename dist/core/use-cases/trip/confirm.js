"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const errors_1 = require("../../../utils/errors");
function makeConfirm({ tripDb } = {}) {
    if (!tripDb)
        throw new errors_1.ServerError();
    return ({ id, seats, routes, } = {}) => (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
        if (!id)
            throw new errors_1.MissingParamError('id');
        const data = { status: 3 };
        if (seats) {
            data.seats = seats;
            data.remainingSeats = seats;
        }
        if (routes && routes.length) {
            data.routes = { update: routes.map(({ id, price }) => ({ where: { id }, data: { price } })) };
        }
        yield tripDb.updateOne({ where: { id }, data });
        const message = { text: "response.add" };
        return { message };
    });
}
exports.default = makeConfirm;
//# sourceMappingURL=confirm.js.map