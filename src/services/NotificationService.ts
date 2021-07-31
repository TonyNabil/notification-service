import Notification_Message from "../models/Notification_Message";
import Notification from "../models/Notification";
import User from "../models/User";
import Group from "../models/Group";
import User_Notification from "../models/User_Notification";
import User_Group from "../models/User_Group";

export default class NotificationService {

    async createNotification(data) {
        const { notificationSubject, notificationBody } = data

        let existingNotificationMessage: any = await Notification_Message.findOne({ notificationSubject, notificationBody })
        if (!existingNotificationMessage) {
            existingNotificationMessage = new Notification_Message({
                notificationSubject,
                notificationBody
            });

            await existingNotificationMessage.save();
        }


        const { userId, groupId, notificationType } = data

        if (userId) {
            const existingUser = await User.findOne({ _id: userId })
            if (!existingUser)
                throw { statusCode: 400, status: "BAD_REQUEST", message: "NO_USER_FOUND" }

            let existingNotification = await Notification.findOne({
                notificationId: existingNotificationMessage._id, userId, notificationType
            })
            if (existingNotification)
                throw { statusCode: 400, status: "BAD_REQUEST", message: "NOTIFICATION_IS_ALREADY_ADDED" }
        }

        if (groupId) {
            const existingGroup = await Group.findOne({ _id: groupId })
            if (!existingGroup)
                throw { statusCode: 400, status: "BAD_REQUEST", message: "NO_GROUP_FOUND" }

            let existingNotification = await Notification.findOne({
                notificationId: existingNotificationMessage._id, groupId, notificationType
            })
            if (existingNotification)
                throw { statusCode: 400, status: "BAD_REQUEST", message: "NOTIFICATION_IS_ALREADY_ADDED" }
        }

        const notification = new Notification({
            notificationId: existingNotificationMessage._id,
            userId,
            groupId,
            notificationType
        });

        await notification.save();

        return notification;
    }

    async listNotifications() {

        let formattedNotifications = []

        const notifications = await Notification.find().populate("notificationId").sort({ creationDate: -1 })

        if (notifications.length) {
            for (const notification of notifications) {
                let response = this.formatNotificationsResponse(notification)
                formattedNotifications.push(response)
            }
        }

        return formattedNotifications;
    }

    async addToUserNotifications(notificationId) {

        const existingNotification: any = await Notification.findOne({ _id: notificationId }).populate("notificationId")
        if (!existingNotification)
            throw { statusCode: 400, status: "BAD_REQUEST", message: "NO_NOTIFICATION_FOUND" }

        if (existingNotification.userId) {

            const userNotification = new User_Notification({
                userId: existingNotification.userId,
                notificationSubject: existingNotification.notificationId.notificationSubject,
                notificationBody: existingNotification.notificationId.notificationBody
            });
            await userNotification.save();

        } else if (existingNotification.groupId) {

            const usersGroup: any = await User_Group.find({ groupId: existingNotification.groupId })
            if (usersGroup.length) {
                let usersNotificationsArr = []
                for (const item of usersGroup) {
                    let userNotification = new User_Notification({
                        userId: item.userId,
                        notificationSubject: existingNotification.notificationId.notificationSubject,
                        notificationBody: existingNotification.notificationId.notificationBody
                    }).save()
                    usersNotificationsArr.push(userNotification)

                }
                await Promise.all(usersNotificationsArr)
            }
        }

    }

    formatNotificationsResponse(notification) {
        let formattedNotificationInfo = {
            id: notification._id,
            notificationId: notification.notificationId._id,
            notificationSubject: notification.notificationId.notificationSubject,
            notificationBody: notification.notificationId.notificationBody,
            userId: notification.userId,
            groupId: notification.groupId,
            notificationType: notification.notificationType,
            status: notification.status,
            creationDate: notification.creationDate
        }
        return formattedNotificationInfo;
    }

}