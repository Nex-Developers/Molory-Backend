"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const errors_1 = require("../../../utils/errors");
const helpers_1 = require("../../../utils/helpers");
function makeReport({ saveTravel, saveTrip, notifyUser }) {
    return ({ travelId, description, userId, interrupted } = {}) => (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
        const prisma = helpers_1.DbConnection.prisma;
        if (!travelId)
            throw new errors_1.MissingParamError('travelId');
        if (!description)
            throw new errors_1.MissingParamError('description');
        yield prisma.travelReport.create({ data: { description, interrupted, user: { connect: { id: userId } }, travel: { connect: { id: travelId } } } });
        const { route, user } = yield prisma.travel.findUnique({ where: { id: travelId }, select: { user: true, route: { select: { departureAddress: true, arrivalAddress: true, departureDate: true, departureTime: true, trip: true } } } });
        if (interrupted) {
            yield prisma.travel.update({ where: { id: travelId }, data: { status: -1, canceledAt: new Date() } });
            if (user.id == userId) {
                notifyUser({ id: userId, titleRef: { text: 'notification.cancelTravel.title' }, messageRef: { text: 'notification.cancelTravel.message', params: { departure: route.departureAddress, arrival: route.arrivalAddress, date: route.departureDate, time: route.departureTime } }, cover: null, data: { path: 'cancel-travel', id: travelId.toString(), res: 'DANGER' }, lang: 'fr', type: 'travel' });
                notifyUser({ id: route.trip.userId, titleRef: { text: 'notification.removeTrip.title' }, messageRef: { text: 'notification.removeTrip.message', params: { name: user.firstName, departure: route.departureAddress, arrival: route.arrivalAddress, date: route.departureDate, time: route.departureTime } }, cover: null, data: { path: 'cancel-travel', id: travelId.toString(), res: 'DANGER' }, lang: 'fr', type: 'travel' });
            }
            else {
                notifyUser({ id: user.id, titleRef: { text: 'notification.removeTrip.title' }, messageRef: { text: 'notification.removeTrip.message' }, cover: null, data: { path: 'cancel-trip', id: travelId.toString(), res: 'INFOS' }, lang: 'fr', type: 'trip' });
            }
        }
        saveTravel(travelId);
        saveTrip(route.trip.id);
        const message = { text: "response.add" };
        return { message };
    });
}
exports.default = makeReport;
//# sourceMappingURL=report.js.map