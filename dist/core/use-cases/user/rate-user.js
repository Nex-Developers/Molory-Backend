"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const errors_1 = require("../../../utils/errors");
function makeRateUser({ userDb }) {
    if (!userDb)
        throw new errors_1.ServerError();
    return ({ rating, }) => (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
        if (rating < 0 || rating > 5)
            throw new errors_1.InvalidParamError('rating');
        const message = { text: "response.add" };
        return { message, rating };
    });
}
exports.default = makeRateUser;
//# sourceMappingURL=rate-user.js.map