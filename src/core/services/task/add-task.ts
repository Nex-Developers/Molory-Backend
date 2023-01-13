import * as cron from "node-cron"

export default () => {
    return async ({
        timer,
        action
    }) => {
        cron.schedule(timer, async () => {
            action()
        });
    }
}
