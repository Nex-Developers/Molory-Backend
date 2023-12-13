"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const bolt_1 = require("@slack/bolt");
class SlackMessaging {
    static sendMessage(message, channel) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const app = new bolt_1.App({
                signingSecret: process.env.SLACK_SIGNING_SECRET || "6eb02e580965aa5df77b528c83eea846",
                token: process.env.SLACK_BOT_TOKEN || "xoxb-6323062419703-6340703978260-4LLTYsWIl331T19u5PtqalvY",
            });
            return new Promise((resolve, reject) => {
                const channelId = channel || process.env.SLACK_CHANNEL_ID;
                try {
                    return app.client.chat.postMessage({
                        token: process.env.SLACK_BOT_TOKEN || "xoxb-6323062419703-6340703978260-4LLTYsWIl331T19u5PtqalvY",
                        text: message,
                        blocks: message,
                        channel: channelId,
                    }).then(() => resolve(true));
                }
                catch (error) {
                    return resolve(true);
                }
            });
        });
    }
}
exports.default = SlackMessaging;
//# sourceMappingURL=slack-messaging.js.map