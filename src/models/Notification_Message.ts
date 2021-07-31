import mongoose, { Schema, Document, model } from 'mongoose';

const NotificationMessageSchema = new Schema({

    notificationSubject: {
        en: {
            type: String,
            required: true,
        },
        ar: {
            type: String,
            required: true,
        },
        fr: {
            type: String,
            required: true,
        },
    },
    notificationBody: {
        en: {
            type: String,
            required: true,
        },
        ar: {
            type: String,
            required: true,
        },
        fr: {
            type: String,
            required: true,
        },
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

export default model('Notification_Message', NotificationMessageSchema);
