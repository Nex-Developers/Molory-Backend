import * as cron from "node-cron"

export default () => {
    return ({
        timer,
        interval,
        action
    }) => {
        cron.schedule(timer, async () => {
            action()
        }, { interval });
    }
}
