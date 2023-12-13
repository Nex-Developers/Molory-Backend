"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const { WebClient } = require('@slack/web-api');
class SlackMessaging {
    static sendMessage(message, channel) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                const channelId = channel || process.env.SLACK_CHANNEL_ID;
                try {
                    return SlackMessaging.web.conversations.join({
                        channel: channel,
                    }).then(() => SlackMessaging.web.chat.postMessage({
                        blocks: message,
                        channel: channelId,
                    }).then(() => resolve(true)));
                }
                catch (error) {
                    return resolve(true);
                }
            });
        });
    }
}
exports.default = SlackMessaging;
SlackMessaging.options = {};
SlackMessaging.web = new WebClient(process.env.SLACK_TOKEN || 'xoxb-6323062419703-6340703978260-K1UwT0VfJCbgMwR6d7AsFQjO', SlackMessaging.options);
//# sourceMappingURL=slack-messaging.js.map