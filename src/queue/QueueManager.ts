import { Queue } from 'bullmq';
import { NotificationTypeEnum } from "../models/Notification"
import connection from '../config/redis';



class QueueManager {
    private smsQueue;
    private emailQueue;
    private pushNotificationQueue;

    constructor() {
        this.smsQueue = new Queue(NotificationTypeEnum.SMS, { connection })
        this.emailQueue = new Queue(NotificationTypeEnum.EMAIL, { connection })
        this.pushNotificationQueue = new Queue(NotificationTypeEnum.PUSH_NOTIFICATION, { connection })
    }

    getQueue(type) {
        if (type == NotificationTypeEnum.SMS)
            return this.smsQueue
        else if (type == NotificationTypeEnum.EMAIL)
            return this.emailQueue
        else if (type == NotificationTypeEnum.PUSH_NOTIFICATION)
            return this.pushNotificationQueue
    }

}

export default new QueueManager();