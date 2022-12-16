"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const errors_1 = require("../../../utils/errors");
exports.default = ({ publicationDb }) => {
    if (!publicationDb)
        throw new errors_1.ServerError();
    return ({ id, userId }) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        if (!id)
            throw new errors_1.MissingParamError('id');
        if (!userId)
            throw new errors_1.MissingParamError('userId');
        yield publicationDb.updateOne({
            where: { id },
            data: {
                notifications: {
                    updateMany: {
                        where: { receiverId: userId },
                        data: { seenAt: new Date() }
                    }
                }
            }
        });
        const message = { text: 'response.edit' };
        return { message };
    });
};
//# sourceMappingURL=set-as-seen.js.map