// const { WebClient } = require('@slack/web-api');
import { App } from "@slack/bolt";


export default class SlackMessaging {
    // private static options = {};
    // static app = new App({
    //     signingSecret: process.env.SLACK_SIGNING_SECRET || "6eb02e580965aa5df77b528c83eea846",
    //     token: process.env.SLACK_BOT_TOKEN || "xoxb-6323062419703-6340703978260-0WkZkEZqSTND53Y1hLrZ1xLj",
    // });

    static async sendMessage(message, channel = "C06A01Y6WFN") {
        console.log(message, channel);
        // const web = new WebClient('xoxb-6323062419703-6340703978260-0WkZkEZqSTND53Y1hLrZ1xLj', {});
       const app  = new App({
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
                        type:"section",
                        text: {
                            type: "mrkdwn",
                            text:`${message}`
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

            } catch (error) {
                return resolve(true);
            }
        });
    }
}