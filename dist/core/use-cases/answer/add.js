"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const errors_1 = require("../../../utils/errors");
exports.default = ({ answerDb }) => {
    if (!answerDb)
        throw new errors_1.ServerError();
    return ({ questionId, value }) => (0, tslib_1.__awaiter)(void 0, void 0, void 0, function* () {
        if (!questionId)
            throw new errors_1.MissingParamError('questionId');
        if (!value)
            throw new errors_1.MissingParamError('value');
        const { id } = yield answerDb.insertOne({ data: { questionId, value } });
        const message = { text: 'response.add' };
        return { message, id };
    });
};
//# sourceMappingURL=add.js.map