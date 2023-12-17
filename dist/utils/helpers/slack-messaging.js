"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const bolt_1 = require("@slack/bolt");
class SlackMessaging {
    static sendMessage(message, channel = "C06A01Y6WFN") {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            console.log(message, channel);
            const app = new bolt_1.App({
                signingSecret: process.env.SLACK_SIGNING_SECRET || "6eb02e580965aa5df77b528c83eea846",
                token: process.env.SLACK_BOT_TOKEN || "xoxb-6323062419703-6340703978260-0WkZkEZqSTND53Y1hLrZ1xLj",
            });
            return new Promise((resolve, reject) => {
                try {
                    return app.client.chat.postMessage({
                        token: process.env.SLACK_BOT_TOKEN || "xoxb-6323062419703-6340703978260-0WkZkEZqSTND53Y1hLrZ1xLj",
                        text: message,
                        blocks: [
                            {
                                type: "section",
                                text: {
                                    type: "mrkdwn",
                                    text: `${message}`
                                },
                            },
                            {
                                type: "actions",
                                elements: [
                                    {
                                        type: "button",
                                        text: {
                                            type: "plain_text",
                                            emoji: true,
                                            text: "Voir",
                                        },
                                        style: "primary",
                                        value: "Voir le dashbaord",
                                        url: "https://molory.xyz",
                                        action_id: "button-action",
                                    },
                                ],
                            },
                        ],
                        channel,
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