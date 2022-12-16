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
    return ({ userId }) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        const select = {
            createdAt: true,
            seenAt: true,
            status: true,
            publication: {
                select: {
                    id: true,
                    title: true,
                    message: true,
                    sound: true,
                    picture: true,
                    data: true,
                }
            }
        };
        const res = yield notificationDb.findMany({
            where: { receiverId: userId, createdAt: { gt: getLastWeeksDate() } },
            select
        });
        return { data: res.map(item => {
                var _a, _b, _c, _d, _e, _f;
                return ({
                    id: (_a = item.publication) === null || _a === void 0 ? void 0 : _a.id,
                    title: (_b = item.publication) === null || _b === void 0 ? void 0 : _b.title,
                    message: (_c = item.publication) === null || _c === void 0 ? void 0 : _c.message,
                    picture: (_d = item.publication) === null || _d === void 0 ? void 0 : _d.picture,
                    data: ((_e = item.publucation) === null || _e === void 0 ? void 0 : _e.data) ? JSON.parse((_f = item.publication) === null || _f === void 0 ? void 0 : _f.data) : null,
                    seenAt: item.seenAt,
                    createdAt: item.createdAt
                });
            }) };
    });
};
//# sourceMappingURL=list-items.js.map