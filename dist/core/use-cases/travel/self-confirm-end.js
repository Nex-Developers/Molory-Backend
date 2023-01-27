"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const missing_param_error_1 = require("../../../utils/errors/missing-param-error");
const errors_1 = require("../../../utils/errors");
const helpers_1 = require("../../../utils/helpers");
exports.default = ({ notifyUser, addTask, saveTrip, saveTravel }) => {
    if (!notifyUser || !addTask || !saveTrip || !saveTravel)
        throw new errors_1.ServerError();
    return ({ id }) => (0, tslib_1.__awaiter)(void 0, void 0, void 0, function* () {
        console.log(' End travel', +id);
        if (!id)
            throw new missing_param_error_1.MissingParamError('id');
        const prisma = helpers_1.DbConnection.prisma;
        return yield prisma.$transaction(() => (0, tslib_1.__awaiter)(void 0, void 0, void 0, function* () {
            const { userId, status, startedAt, route } = yield prisma.travel.findUnique({ where: { id }, select: { route: true, userId: true, status: true, startedAt: true } });
            if (status !== 2)
                throw new errors_1.AlreadyDoneError(startedAt === null || startedAt === void 0 ? void 0 : startedAt.toString());
            yield prisma.travel.update({ where: { id }, data: { status: 1, startedAt: new Date() } });
            notifyUser({ id: userId, titleRef: { text: 'notification.selfConfirmTravelEnded.title' }, messageRef: { text: 'notification.selfConfirmTravelEnded.message' }, cover: null, data: { type: 'travel', id }, lang: 'fr' });
            yield saveTravel(id);
            saveTrip(route.tripId);
            const message = { text: "response.edit" };
            return { message };
        }));
    });
};
//# sourceMappingURL=self-confirm-end.js.map