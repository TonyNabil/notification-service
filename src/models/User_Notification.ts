import mongoose, { Schema, Document, model } from 'mongoose';

const UserNotificationSchema = new Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        require: true
    },
    notificationSubject: {
        type: String
    },
    notificationBody: {
        type: String
    },
    creationDate: {
        type: Date,
        default: new Date()
    }
}, {
    versionKey: false
})

export default model('UserNotification', UserNotificationSchema);
