"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const errors_1 = require("../../../utils/errors");
function makeSetProfile({ userDb, notifyDevice, publicationDb } = {}) {
    if (!userDb || !publicationDb || !notifyDevice)
        throw new errors_1.ServerError();
    return function setProfile({ id, lang, firstName, lastName, gender, email, birthDay } = {}) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            console.log('birthDay', birthDay);
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
            const res = { firstName, lastName, gender, birthDay, email, profileCompletedAt: new Date(), language: lang };
            const deviceTokens = user.devices.map(device => device.token);
            const { title, body, data, cover } = yield notifyDevice({ deviceTokens, titleRef: 'notification.signUpTitle', messageRef: 'notification.signUpMessage', cover: null, data: null, lang: 'fr' });
            yield publicationDb.insertOne({
                data: {
                    title,
                    message: body,
                    data: data ? JSON.stringify(data) : null,
                    picture: cover,
                    notifications: {
                        create: {
                            user: {
                                connect: { id: user.id }
                            }
                        }
                    }
                }
            });
            user = yield userDb.updateOne({ where: { id }, data: res });
            const message = { text: 'auth.message.profileUpdated' };
            return { message, user };
        });
    };
}
exports.default = makeSetProfile;
//# sourceMappingURL=set-profile.js.map