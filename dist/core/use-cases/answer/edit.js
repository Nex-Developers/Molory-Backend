"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const errors_1 = require("../../../utils/errors");
exports.default = ({ answerDb }) => {
    if (!answerDb)
        throw new errors_1.ServerError();
    return ({ id, questionId, value }) => (0, tslib_1.__awaiter)(void 0, void 0, void 0, function* () {
        if (!id)
            throw new errors_1.MissingParamError('id');
        const data = {};
        if (questionId)
            data['questionId'] = questionId;
        if (value)
            data['value'] = value;
        if (!Object.keys(data).length)
            throw new errors_1.MissingParamError('questionId, value');
        yield answerDb.updateOne({ where: { id }, data });
        const message = { text: 'response.edit' };
        return { message };
    });
};
//# sourceMappingURL=edit.js.map