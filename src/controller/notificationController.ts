import { Response, Request } from "express";
import NotificationService from "../services/NotificationService";
import { handleErrors } from "../util/utils"
import NotifierFactory from "../factory/NotifierFactory";
import { Worker, QueueScheduler } from "bullmq";
import queueManager from "../queue/QueueManager"
import Notification, { StatusEnum } from "../models/Notification";
import connection from '../config/redis';

class NotificationController {

    private notificationObject: NotificationService;
    private factory: NotifierFactory;

    constructor() {
        this.notificationObject = new NotificationService();
        this.factory = new NotifierFactory()
    }

    createNotification = async (req: Request, res: Response) => {
        try {
            let notification: any = await this.notificationObject.createNotification(req.body);
            let { _id, notificationType } = notification
            const notifierObject = this.factory.getNotifierObject(notificationType);
            await this.notificationObject.addToUserNotifications(_id);

            await queueManager.getQueue(notificationType).add('sendNotification', notification)
            let worker = new Worker(notificationType, async job => notifierObject.send(job.data), {
                connection,
                limiter: notifierObject.getRateLimterObject(1000, 60000)
            });
            new QueueScheduler(notificationType, { connection });
            worker.on('completed', async (job) => {
                await Notification.updateOne({ _id: job.data._id }, { $set: { status: StatusEnum.SENT } })
            });

            return res.send({ status: "OK", message: "SUCCESS" });

        } catch (error) {
            console.log(error);
            const { statusCode, status, message } = handleErrors(error)
            return res.status(statusCode).json({
                status: status,
                message: message
            });
        }
    }

    listNotifications = async (req: Request, res: Response) => {
        try {
            const result = await this.notificationObject.listNotifications();
            return res.send({ status: "OK", message: "SUCCESS", result });

        } catch (error) {
            console.log(error);
            const { statusCode, status, message } = handleErrors(error)
            return res.status(statusCode).json({
                status: status,
                message: message
            });
        }
    }

}

export const notificationController = new NotificationController();