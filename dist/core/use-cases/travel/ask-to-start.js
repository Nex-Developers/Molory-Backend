"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const missing_param_error_1 = require("../../../utils/errors/missing-param-error");
const errors_1 = require("../../../utils/errors");
const helpers_1 = require("../../../utils/helpers");
exports.default = ({ notifyUser, saveTravel }) => {
    if (!notifyUser || !saveTravel)
        throw new errors_1.ServerError();
    return ({ id }) => (0, tslib_1.__awaiter)(void 0, void 0, void 0, function* () {
        console.log('Ask Start travel', +id);
        if (!id)
            throw new missing_param_error_1.MissingParamError('id');
        const prisma = helpers_1.DbConnection.prisma;
        return yield prisma.$transaction(() => (0, tslib_1.__awaiter)(void 0, void 0, void 0, function* () {
            const { userId, status, departureAddress, arrivalAddress, departureDate, departureTime } = yield prisma.travel.findUnique({ where: { id }, select: { userId: true, status: true, departureAddress: true, arrivalAddress: true, departureDate: true, departureTime: true } });
            if (status < 4)
                throw new errors_1.AlreadyDoneError('unkown date');
            yield prisma.travel.update({ where: { id }, data: { status: 4 } });
            notifyUser({ id: userId, titleRef: { text: 'notification.AskStartTravel.title' }, messageRef: { text: 'notification.AskStartTravel.message', params: { departure: departureAddress, arrival: arrivalAddress, date: departureDate, time: departureTime } }, cover: null, data: { path: 'start-travel', id: id.toString(), res: 'INFOS' }, lang: 'fr', type: 'travel' });
            yield saveTravel(id);
            const message = { text: "response.edit" };
            return { message };
        }));
    });
};
//# sourceMappingURL=ask-to-start.js.map