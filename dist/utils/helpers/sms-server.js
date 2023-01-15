"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const server_sdk_1 = require("@vonage/server-sdk");
class SmsServer {
    static send(phoneNumbers, message) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            yield SmsServer.vonage.sms.send({ to: phoneNumbers[0], from: 'Molory', text: message })
                .then(resp => { console.log('Message sent successfully'); console.log(resp); return resp; })
                .catch(err => { console.log('There was an error sending the messages.', err.meesage); return; });
        });
    }
}
exports.default = SmsServer;
SmsServer.credentials = {
    apiKey: 'ebf64a21',
    apiSecret: 'N3VVLO1bogVEPQRS'
};
SmsServer.vonage = new server_sdk_1.Vonage(SmsServer.credentials);
//# sourceMappingURL=sms-server.js.map