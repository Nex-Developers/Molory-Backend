"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const errors_1 = require("../../../utils/errors");
function makeEdit({ preferenceDb } = {}) {
    if (!preferenceDb)
        throw new errors_1.ServerError();
    return ({ userId, questionId, answerId } = {}) => tslib_1.__awaiter(this, void 0, void 0, function* () {
        if (!userId)
            throw new errors_1.MissingParamError('id');
        if (!questionId)
            throw new errors_1.MissingParamError('questionId');
        if (!answerId)
            throw new errors_1.MissingParamError('answerId');
        yield preferenceDb.updateOne({ where: { userId, questionId }, data: { answerId } });
        const message = { text: "response.edit" };
        return { message };
    });
}
exports.default = makeEdit;
//# sourceMappingURL=edit.js.map