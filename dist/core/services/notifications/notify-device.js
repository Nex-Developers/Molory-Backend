"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const errors_1 = require("../../../utils/errors");
function makeNotifyDevice({ sendNotification, translate } = {}) {
    if (!sendNotification || !translate)
        throw new errors_1.ServerError();
    return function notifyDevice({ deviceTokens, titleRef, messageRef, cover, data, lang } = {}) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            if (!titleRef || !messageRef)
                throw new errors_1.ServerError();
            const title = translate(lang, titleRef.text, titleRef.params);
            const body = translate(lang, messageRef.text, messageRef.params);
            try {
                if (deviceTokens && deviceTokens.length)
                    sendNotification(deviceTokens, title, body, data, cover);
            }
            catch (err) {
                console.log(err.message);
            }
            return { title, body, data, cover };
        });
    };
}
exports.default = makeNotifyDevice;
//# sourceMappingURL=notify-device.js.map