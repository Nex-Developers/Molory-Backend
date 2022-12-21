"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const errors_1 = require("../../../utils/errors");
const helpers_1 = require("../../../utils/helpers");
function makeAdd({ preferenceDb, saveProfile } = {}) {
    if (!preferenceDb || !saveProfile)
        throw new errors_1.ServerError();
    return ({ userId, preferences } = {}) => (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
        const prisma = helpers_1.DbConnection.prisma;
        if (!userId)
            throw new errors_1.MissingParamError('userId');
        return yield prisma.$transaction(() => (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            yield prisma.preference.deleteMany({ where: { userId } });
            const promises = yield preferences.map(({ questionId, answerIndex, answerId }) => (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
                if (!questionId)
                    throw new errors_1.MissingParamError('questionId');
                if (!answerId) {
                    if (answerIndex === undefined || answerIndex === null)
                        throw new errors_1.MissingParamError('answerIndex');
                    const { id } = yield prisma.answer.findFirst({ where: { questionId, index: answerIndex }, select: { id: true } });
                    answerId = id;
                    console.log(id);
                }
                return yield prisma.preference.create({ data: {
                        user: {
                            connect: { id: userId }
                        },
                        question: {
                            connect: { id: questionId }
                        },
                        answer: {
                            connect: { id: answerId }
                        },
                        answerIndex
                    } });
            }));
            return Promise.all(promises).then(() => {
                saveProfile(userId);
                const message = { text: "response.add" };
                return { message };
            });
        }));
    });
}
exports.default = makeAdd;
//# sourceMappingURL=add.js.map