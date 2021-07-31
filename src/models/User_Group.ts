import mongoose, { Schema, Document, model } from 'mongoose';

const UserGroupSchema = new Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "User",
    },
    groupId: {
        type: mongoose.Types.ObjectId,
        ref: "Group",
    }
}, {
    versionKey: false
})

export default model('UserGroup', UserGroupSchema);
