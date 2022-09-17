"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const errors_1 = require("../../../utils/errors");
function makeEdit({ preferenceDb } = {}) {
    if (!preferenceDb)
        throw new errors_1.ServerError();
    return ({ id, question, answer } = {}) => (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
        if (!id)
            throw new errors_1.MissingParamError('id');
        const data = {};
        if (question)
            data.question = question;
        if (answer)
            data.answer = answer;
        if (Object.keys(data).length === 0)
            throw new errors_1.MissingParamError('all');
        yield preferenceDb.updateOne({ where: { id }, data });
        const message = { text: "response.edit" };
        return { message };
    });
}
exports.default = makeEdit;
//# sourceMappingURL=edit.js.map