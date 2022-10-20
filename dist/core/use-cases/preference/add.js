"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const errors_1 = require("../../../utils/errors");
function makeAdd({ preferenceDb } = {}) {
    if (!preferenceDb)
        throw new errors_1.ServerError();
    return ({ question, answer } = {}) => (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
        if (!question)
            throw new errors_1.MissingParamError('question');
        if (!answer)
            throw new errors_1.MissingParamError('answer');
        const { id } = yield preferenceDb.insertOne({ data: { question, answer } });
        const message = { text: "response.add" };
        return { message, id };
    });
}
exports.default = makeAdd;
//# sourceMappingURL=add.js.map