"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const missing_param_error_1 = require("../../../utils/errors/missing-param-error");
const errors_1 = require("../../../utils/errors");
const helpers_1 = require("../../../utils/helpers");
exports.default = ({ notifyUser, addTask, saveTrip, saveTravel }) => {
    if (!notifyUser || !addTask || !saveTrip || !saveTravel)
        throw new errors_1.ServerError();
    const reformateDate = (date) => {
        return date.split("-").reverse().join("-");
    };
    const getCalculatedtDate = (date, additionalMinutes) => {
        return new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes() + additionalMinutes);
    };
    return ({ id, response, reason }) => (0, tslib_1.__awaiter)(void 0, void 0, void 0, function* () {
        console.log(' Start travel', +id);
        if (!id)
            throw new missing_param_error_1.MissingParamError('id');
        if (!response)
            response = false;
        const prisma = helpers_1.DbConnection.prisma;
        return yield prisma.$transaction(() => (0, tslib_1.__awaiter)(void 0, void 0, void 0, function* () {
            const { userId, status, startedAt, route } = yield prisma.travel.findUnique({ where: { id }, select: { userId: true, status: true, startedAt: true, route: true } });
            if (status !== 4)
                throw new errors_1.AlreadyDoneError(startedAt === null || startedAt === void 0 ? void 0 : startedAt.toString());
            const formatedDate = reformateDate(route.departureDate);
            const date = new Date(formatedDate + ' ' + route.departureTime);
            if (response) {
                yield prisma.travel.update({ where: { id }, data: { status: 3, startedAt: new Date() } });
                const timer = getCalculatedtDate(date, route.duration * 60);
                console.log(timer);
                yield addTask({ path: 'ask-travel-finish', timer, params: { id } });
                notifyUser({ id: userId, titleRef: { text: 'notification.confirmTravelStarted.title' }, messageRef: { text: 'notification.confirmTravelStarted.message' }, cover: null, data: { path: 'start-travel', id: id.toString(), res: 'INFOS' }, lang: 'fr', type: 'travel' });
            }
            else {
                console.log(" No response => ", reason);
                yield prisma.travel.update({ where: { id }, data: { notStartedReason: reason } });
                const timer = getCalculatedtDate(date, 30);
                yield addTask({ path: 'ask-travel-start', timer, params: { id } });
            }
            yield saveTravel(id);
            saveTrip(route.tripId);
            const message = { text: "response.edit" };
            return { message };
        }));
    });
};
//# sourceMappingURL=confirm-start.js.map