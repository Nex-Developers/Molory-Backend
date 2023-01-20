"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const errors_1 = require("../../../utils/errors");
const helpers_1 = require("../../../utils/helpers");
function makeNotifyUser({ sendNotification, addInCollection, translate } = {}) {
    if (!sendNotification || !addInCollection || !translate)
        throw new errors_1.ServerError();
    return function notifyUser({ id, titleRef, messageRef, cover, data, lang } = {}) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            if (!titleRef || !messageRef)
                throw new errors_1.ServerError();
            const title = translate(lang, titleRef.text, titleRef.params);
            const body = translate(lang, messageRef.text, messageRef.params);
            try {
                const prisma = helpers_1.DbConnection.prisma;
                const devices = yield prisma.device.findMany({ where: { userId: id }, select: { token: true } });
                const deviceTokens = devices.map(device => device.token).filter(token => token);
                if (deviceTokens.length)
                    sendNotification(deviceTokens, title, body, data, cover);
                addInCollection('users', id.toString(), 'notifications', { type: data.type, title, body, data, cover });
                prisma.publication.create({
                    data: {
                        title,
                        message: body,
                        data: data ? JSON.stringify(data) : null,
                        picture: cover,
                        notifications: {
                            create: {
                                user: {
                                    connect: { id }
                                }
                            }
                        }
                    }
                });
                return;
            }
            catch (err) {
                console.log(err.message);
            }
        });
    };
}
exports.default = makeNotifyUser;
//# sourceMappingURL=notify-user.js.map