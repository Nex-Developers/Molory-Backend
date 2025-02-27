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
        console.log(' End travel', +id);
        if (!id)
            throw new missing_param_error_1.MissingParamError('id');
        if (!response)
            response = false;
        const prisma = helpers_1.DbConnection.prisma;
        return yield prisma.$transaction(() => (0, tslib_1.__awaiter)(void 0, void 0, void 0, function* () {
            const { userId, status, startedAt, departureAddress, arrivalAddress, departureDate, departureTime, route } = yield prisma.travel.findUnique({ where: { id }, select: { userId: true, status: true, startedAt: true, departureAddress: true, arrivalAddress: true, departureDate: true, departureTime: true, route: true } });
            if (status !== 2)
                throw new errors_1.AlreadyDoneError(startedAt === null || startedAt === void 0 ? void 0 : startedAt.toString());
            const formatedDate = reformateDate(route.departureDate);
            const date = new Date(formatedDate + ' ' + route.departureTime);
            if (response) {
                yield prisma.travel.update({ where: { id }, data: { status: 1, startedAt: new Date() } });
                notifyUser({ id: userId, titleRef: { text: 'notification.confirmTravelEnded.title' }, messageRef: { text: 'notification.confirmTravelEnded.message', params: { departure: departureAddress, arrival: arrivalAddress, date: departureDate, time: departureTime } }, cover: null, data: { path: 'travel-ended', id: id.toString(), res: 'SUCCCESS' }, lang: 'fr', type: 'travel' });
            }
            else {
                yield prisma.travel.update({ where: { id }, data: { notEndedReason: reason } });
                const timer = getCalculatedtDate(date, route.duration * 60 + 6 * 60);
                yield addTask({ path: 'self-confirm-travel-ended', timer, params: { id } });
            }
            yield saveTravel(id);
            saveTrip(route.tripId);
            const message = { text: "response.edit" };
            return { message };
        }));
    });
};
//# sourceMappingURL=confirm-end.js.map