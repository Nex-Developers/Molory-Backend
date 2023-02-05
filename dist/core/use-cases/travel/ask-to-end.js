"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const missing_param_error_1 = require("../../../utils/errors/missing-param-error");
const errors_1 = require("../../../utils/errors");
const helpers_1 = require("../../../utils/helpers");
exports.default = ({ notifyUser, addTask, saveTravel }) => {
    if (!notifyUser || !addTask || !saveTravel)
        throw new errors_1.ServerError();
    const reformateDate = (date) => {
        return date.split("-").reverse().join("-");
    };
    const getCalculatedtDate = (date, additionalMinutes) => {
        return new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes() + additionalMinutes);
    };
    return ({ id }) => (0, tslib_1.__awaiter)(void 0, void 0, void 0, function* () {
        console.log(' Ask End travel', +id);
        if (!id)
            throw new missing_param_error_1.MissingParamError('id');
        const prisma = helpers_1.DbConnection.prisma;
        return yield prisma.$transaction(() => (0, tslib_1.__awaiter)(void 0, void 0, void 0, function* () {
            const { userId, status, route } = yield prisma.travel.findUnique({ where: { id }, select: { userId: true, status: true, route: true } });
            if (status !== 3)
                throw new errors_1.AlreadyDoneError('unkown date');
            yield prisma.travel.update({ where: { id }, data: { status: 2 } });
            notifyUser({ id: userId, titleRef: { text: 'notification.AskStopTravel.title' }, messageRef: { text: 'notification.AskStopTravel.message' }, cover: null, data: { path: 'end-travel', id: id.toString(), res: 'INFOS' }, lang: 'fr', type: 'travel' });
            yield saveTravel(id);
            const formatedDate = reformateDate(route.departureDate);
            const date = new Date(formatedDate + ' ' + route.departureTime);
            const timer = getCalculatedtDate(date, route.duration * 60 + 6 * 60);
            yield addTask({ path: 'self-confirm-travel-ended', timer, params: { id, response: true, confirmedBy: 'molory' } });
            const message = { text: "response.edit" };
            return { message };
        }));
    });
};
//# sourceMappingURL=ask-to-end.js.map