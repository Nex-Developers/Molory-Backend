"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const moment_1 = (0, tslib_1.__importDefault)(require("moment"));
const errors_1 = require("../../../utils/errors");
const helpers_1 = require("../../../utils/helpers");
function makeSetProfile({ userDb, notifyUser, publicationDb, saveProfile } = {}) {
    if (!userDb || !publicationDb || !notifyUser || !saveProfile)
        throw new errors_1.ServerError();
    return function setProfile({ id, lang, firstName, lastName, gender, email, birthDay } = {}) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const prisma = helpers_1.DbConnection.prisma;
            if (!id)
                throw new errors_1.MissingParamError('token');
            if (!firstName)
                throw new errors_1.MissingParamError('firstName');
            if (!lastName)
                throw new errors_1.MissingParamError('lastName');
            if (!gender)
                throw new errors_1.MissingParamError('gender');
            if (!birthDay)
                throw new errors_1.MissingParamError('birthDay');
            const formatedDateArray = birthDay.split('-');
            const fomatedDate = [formatedDateArray[1], formatedDateArray[0], formatedDateArray[2]].join('-');
            birthDay = new Date(fomatedDate);
            let user = yield userDb.findFirst({ where: { id }, select: { id: true, firstName: true, lastName: true, birthDay: true, profileCompletedAt: true, devices: true } });
            if (user && (user.firstName || user.lastName || user.birthDay)) {
                const message = { text: 'error.alreadyDone', params: { date: user.profileCompletedAt } };
                return { message };
            }
            const res = { id, firstName, lastName, gender, birthDay, email, profileCompletedAt: new Date(), language: lang };
            yield prisma.wallet.create({ data: { id } });
            user = yield userDb.updateOne({ where: { id }, data: res });
            saveProfile(id);
            notifyUser({ id, titleRef: { text: 'notification.signUpTitle' }, messageRef: { text: 'notification.signUpMessage' }, cover: null, data: { path: 'complete-profile', id: id.toString(), res: 'SUCCESS' }, lang: 'fr', type: 'authentication' });
            user.birthDay = (0, moment_1.default)(user.birthDay).format('DD-MM-YYYY');
            const message = { text: 'auth.message.profileUpdated' };
            return { message, user };
        });
    };
}
exports.default = makeSetProfile;
//# sourceMappingURL=set-profile.js.map