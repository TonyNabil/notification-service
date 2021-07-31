import mongoose, { Schema, Document, model } from 'mongoose';

const GroupSchema = new Schema({
    name: {
        type: String
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

export default model('Group', GroupSchema);
