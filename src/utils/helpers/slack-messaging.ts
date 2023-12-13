const { WebClient } = require('@slack/web-api');


export default class SlackMessaging {
    // private static options = {};

    static async sendMessage(message, channel) {
        const web = new WebClient('xoxb-6323062419703-6340703978260-4VpQLD1RTKVUe6yOoDRjzaF3', {});
        return new Promise((resolve, reject) => {
            const channelId = channel || process.env.SLACK_CHANNEL_ID;
            try {
                return web.conversations.join({
                    channel: channel,
                }).then(() => web.chat.postMessage({
                    blocks: message,
                    channel: channelId,
                }).then(() => resolve(true)));

            } catch (error) {
                return resolve(true);
            }
        });
    }
}