// const { WebClient } = require('@slack/web-api');
import { App } from "@slack/bolt";


export default class SlackMessaging {
    // private static options = {};
    // static app = new App({
    //     signingSecret: process.env.SLACK_SIGNING_SECRET || "6eb02e580965aa5df77b528c83eea846",
    //     token: process.env.SLACK_BOT_TOKEN || "xoxb-6323062419703-6340703978260-4LLTYsWIl331T19u5PtqalvY",
    // });

    static async sendMessage(message, channel) {
        // const web = new WebClient('xoxb-6323062419703-6340703978260-4LLTYsWIl331T19u5PtqalvY', {});
       const app  = new App({
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

            } catch (error) {
                return resolve(true);
            }
        });
    }
}