import { Notification } from "@prisma/client";
import Query from "./query";

export default class NotificationDb extends Query<Notification> {
    constructor() {
        super('notification')
    }

    // 
}