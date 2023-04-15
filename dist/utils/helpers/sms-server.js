"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const messagebird_1 = (0, tslib_1.__importDefault)(require("messagebird"));
const environment_1 = require("../../configs/environment");
class SmsServer {
    static send(phoneNumbers, message) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const params = {
                'originator': environment_1.env.sms.sender,
                'recipients': phoneNumbers,
                'body': message
            };
            SmsServer.messaging.messages.create(params, function (err, response) {
                if (err) {
                    return console.log(err);
                }
                console.log(response);
            });
        });
    }
}
exports.default = SmsServer;
SmsServer.messaging = messagebird_1.default.initClient(environment_1.env.sms.key);
//# sourceMappingURL=sms-server.js.map