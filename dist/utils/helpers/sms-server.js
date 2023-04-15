"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const messagebird_1 = (0, tslib_1.__importDefault)(require("messagebird"));
const environment_1 = require("../../configs/environment");
const util_1 = require("util");
class SmsServer {
    static send(phoneNumbers, message) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            console.log(environment_1.env.sms.key);
            const messaging = messagebird_1.default.initClient(environment_1.env.sms.key);
            const params = {
                'originator': environment_1.env.sms.sender,
                'recipients': phoneNumbers,
                'body': message
            };
            const makeAsync = (0, util_1.promisify)(messaging.messages.create).bind(messaging.messages);
            try {
                return makeAsync(params);
            }
            catch (err) {
                console.log('Message bird error: ', err.message);
            }
        });
    }
}
exports.default = SmsServer;
//# sourceMappingURL=sms-server.js.map