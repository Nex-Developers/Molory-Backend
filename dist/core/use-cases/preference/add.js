"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const errors_1 = require("../../../utils/errors");
function makeAdd({ preferenceDb } = {}) {
    if (!preferenceDb)
        throw new errors_1.ServerError();
    return ({ userId, preferences } = {}) => (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
        if (!userId)
            throw new errors_1.MissingParamError('userId');
        yield preferenceDb.deleteMany({ where: { userId }, force: true });
        const promises = yield preferences.map(({ questionId, answerId }) => (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            if (!questionId)
                throw new errors_1.MissingParamError('questionId');
            if (!answerId)
                throw new errors_1.MissingParamError('answerId');
            const preference = yield preferenceDb.findFirst({ where: { userId, questionId } });
            if (preference)
                yield preferenceDb.updateOne({ where: { userId, questionId }, data: { answerId } });
            else
                yield preferenceDb.insertOne({ data: { userId, questionId, answerId } });
            return;
        }));
        return Promise.all(promises).then(() => {
            const message = { text: "response.add" };
            return { message };
        });
    });
}
exports.default = makeAdd;
//# sourceMappingURL=add.js.map