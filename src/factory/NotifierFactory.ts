import MailService from "../services/MailService";
import SmsService from "../services/SmsService";
import PushNotificationService from "../services/PushNotificationService";
import { NotificationTypeEnum } from "../models/Notification"

export default class NotifierFactory {

    getNotifierObject(type) {

        if (type == NotificationTypeEnum.EMAIL)
            return new MailService();

        else if (type == NotificationTypeEnum.SMS)
            return new SmsService()

        else if (type == NotificationTypeEnum.PUSH_NOTIFICATION)
            return new PushNotificationService()

    }

}