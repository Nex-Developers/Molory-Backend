"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const errors_1 = require("../../../utils/errors");
const helpers_1 = require("../../../utils/helpers");
exports.default = ({ notifyUser, addTask, saveTrip, saveTravel }) => {
    if (!notifyUser || !addTask || !saveTrip || !saveTravel)
        throw new errors_1.ServerError();
    const reformateDate = (date) => {
        return date.split("-").reverse().join("-");
    };
    const getNextDay = (date) => {
        return new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes());
    };
    return ({ id }) => (0, tslib_1.__awaiter)(void 0, void 0, void 0, function* () {
        console.log(' Start trip', +id);
        const prisma = helpers_1.DbConnection.prisma;
        return yield prisma.$transaction(() => (0, tslib_1.__awaiter)(void 0, void 0, void 0, function* () {
            const { userId, departureDate, departureTime, departureAddress, arrivalAddress, status, startedAt } = yield prisma.trip.findUnique({ where: { id }, select: { userId: true, status: true, startedAt: true, departureDate: true, departureTime: true, departureAddress: true, arrivalAddress: true } });
            if (status !== 3)
                throw new errors_1.AlreadyDoneError(startedAt === null || startedAt === void 0 ? void 0 : startedAt.toString());
            yield prisma.trip.update({ where: { id }, data: { status: 2, startedAt: new Date() } });
            notifyUser({ id: userId, titleRef: { text: 'notification.startTrip.title' }, messageRef: { text: 'notification.startTrip.message', params: { departure: departureAddress, arrival: arrivalAddress, date: departureDate, time: departureTime } }, cover: null, data: { path: 'start-trip', id: id.toString(), res: 'INFOS' }, lang: 'fr', type: 'trip' });
            const formatedDate = reformateDate(departureDate);
            const date = new Date(formatedDate + ' ' + departureTime);
            const timer = getNextDay(date);
            yield addTask({ path: 'trip-finish', timer, params: { id } });
            saveTrip(id);
            const message = { text: "response.edit" };
            return { message };
        }));
    });
};
//# sourceMappingURL=start.js.map