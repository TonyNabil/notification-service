import mongoose, { Schema, Document, model } from 'mongoose';

export enum NotificationTypeEnum {
    SMS = "SMS",
    EMAIL = "EMAIL",
    PUSH_NOTIFICATION = "PUSH_NOTIFICATION"
}

export enum StatusEnum {
    SENT = "SENT",
    PENDING = "PENDING",
    FAILED = "FAILED"
}

const NotificationSchema = new Schema({
    notificationId: {
        type: mongoose.Types.ObjectId,
        ref: "Notification_Message",
    },
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "User",
    },
    groupId: {
        type: mongoose.Types.ObjectId,
        ref: "Group",
    },
    notificationType: {
        type: String,
        enum: [
            NotificationTypeEnum.SMS,
            NotificationTypeEnum.EMAIL,
            NotificationTypeEnum.PUSH_NOTIFICATION
        ]
    },
    status: {
        type: String,
        enum: [
            StatusEnum.SENT,
            StatusEnum.PENDING,
            StatusEnum.FAILED
        ],
        default: StatusEnum.PENDING
    },
    creationDate: {
        type: Date,
        default: new Date()
    },
    modificationDate: {
        type: Date,
        default: new Date()
    }
}, {
    versionKey: false
})

export default model('Notification', NotificationSchema);
