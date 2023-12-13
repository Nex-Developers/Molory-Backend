const { WebClient } = require('@slack/web-api');


export default class SlackMessaging {
    private static options = {};
    private static web = new WebClient(process.env.SLACK_TOKEN || 'xoxb-6323062419703-6340703978260-K1UwT0VfJCbgMwR6d7AsFQjO', SlackMessaging.options);

    static async sendMessage(message, channel) {
        return new Promise((resolve, reject) => {
            const channelId = channel || process.env.SLACK_CHANNEL_ID;
            try {
                return SlackMessaging.web.conversations.join({
                    channel: channel,
                }).then(() => SlackMessaging.web.chat.postMessage({
                    blocks: message,
                    channel: channelId,
                }).then(() => resolve(true)));

            } catch (error) {
                return resolve(true);
            }
        });
    }
}