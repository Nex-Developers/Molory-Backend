"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const axios_1 = (0, tslib_1.__importDefault)(require("axios"));
const environment_1 = require("../../configs/environment");
class SmsServer {
    static send(phoneNumbers, message) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            console.log(' production ', environment_1.env.production);
            if (environment_1.env.production) {
                try {
                    const { data } = yield axios_1.default.post(SmsServer.apiUrl, {
                        SenderId: SmsServer.sender,
                        ApiKey: SmsServer.apiKey,
                        ClientId: SmsServer.apiToken,
                        MobileNumbers: phoneNumbers[0],
                        Message: message,
                    });
                    return data;
                }
                catch (e) {
                    console.log(e.message);
                    return;
                }
            }
            else {
                console.log(message);
            }
        });
    }
}
exports.default = SmsServer;
SmsServer.apiUrl = environment_1.env.sms.url;
SmsServer.apiKey = environment_1.env.sms.key;
SmsServer.apiToken = environment_1.env.sms.token;
SmsServer.sender = environment_1.env.sms.sender;
//# sourceMappingURL=sms-server.js.map