"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const errors_1 = require("../../../utils/errors");
exports.default = ({ notificationDb }) => {
    if (!notificationDb)
        throw new errors_1.ServerError();
    return ({ id, value }) => (0, tslib_1.__awaiter)(void 0, void 0, void 0, function* () {
        if (!id)
            throw new errors_1.MissingParamError('id');
        if (!value)
            throw new errors_1.MissingParamError('value');
        yield notificationDb.updateOne({ where: { id }, data: { seenAt: new Date(), status: 1 } });
        const message = { text: 'response.edit' };
        return { message };
    });
};
//# sourceMappingURL=set-as-seen.js.map