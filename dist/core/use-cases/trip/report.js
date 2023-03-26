"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const errors_1 = require("../../../utils/errors");
const helpers_1 = require("../../../utils/helpers");
function makeReport({ notifyUser, saveTravel, saveTrip }) {
    const prisma = helpers_1.DbConnection.prisma;
    return ({ tripId, description, interrupted } = {}) => (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
        if (!tripId)
            throw new errors_1.MissingParamError('tripId');
        if (!description)
            throw new errors_1.MissingParamError('description');
        yield prisma.tripReport.create({ data: { description, interrupted, trip: { connect: { id: tripId } } } });
        if (interrupted) {
            const { routes, userId } = yield prisma.trip.findUnique({ where: { id: tripId }, select: { userId: true, routes: { select: { travels: true } }, } });
            yield prisma.trip.update({ where: { id: tripId }, data: { status: -1, canceledAt: new Date() } });
            const promises = routes.map((route) => (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
                const travelsIds = route.travels.map(travel => travel.id);
                yield prisma.travel.updateMany({
                    where: { id: { in: travelsIds } },
                    data: {
                        status: -1,
                        canceledAt: new Date(),
                        cancelReason: description,
                        canceledBy: 'driver',
                    },
                });
                const promises2 = yield route.travels.map((travel) => (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
                    notifyUser({ id: travel.userId, titleRef: { text: 'notification.removeTrip.title' }, messageRef: { text: 'notification.removeTrip.message' }, cover: null, data: { path: 'cancel-trip', id: tripId.toString(), res: 'INFOS' }, lang: 'fr', type: 'trip' });
                    saveTravel(travel.id);
                    return true;
                }));
                return Promise.all(promises2).then(() => true);
            }));
            return Promise.all(promises).then(() => {
                saveTrip(tripId);
                notifyUser({ id: userId, titleRef: { text: 'notification.interruptTrip.title' }, messageRef: { text: 'notification.interruptTrip.message', params: { reason: description } }, cover: null, data: { path: 'cancel-trip', id: tripId.toString(), res: 'INFOS' }, lang: 'fr', type: 'trip' });
                return;
            });
        }
        saveTrip(tripId);
        const message = { text: "response.add" };
        return { message };
    });
}
exports.default = makeReport;
//# sourceMappingURL=report.js.map