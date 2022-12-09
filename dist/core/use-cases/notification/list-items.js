"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const errors_1 = require("../../../utils/errors");
exports.default = ({ notificationDb }) => {
    const getLastWeeksDate = () => {
        const now = new Date();
        return new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7);
    };
    if (!notificationDb)
        throw new errors_1.ServerError();
    return ({ userId }) => (0, tslib_1.__awaiter)(void 0, void 0, void 0, function* () {
        const select = {
            id: true,
            creatAt: true,
            seenAt: true,
            status: true,
            publication: {
                select: {
                    title: true,
                    message: true,
                    sound: true,
                    picture: true,
                    data: true,
                }
            }
        };
        const data = yield notificationDb.findMany({
            where: { recieverId: userId, createdAt: { gt: getLastWeeksDate() } },
            select
        });
        return { data };
    });
};
//# sourceMappingURL=list-items.js.map