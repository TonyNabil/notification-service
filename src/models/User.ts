import mongoose, { Schema, Document, model } from 'mongoose';

export enum LanguageEnum {
    en = "en",
    ar = "ar",
    fr = "fr"
}

const UserSchema = new Schema({
    name: {
        type: String
    },
    phone: {
        type: String
    },
    email: {
        type: String
    },
    language: {
        type: String,
        enum: [
            LanguageEnum.en,
            LanguageEnum.ar,
            LanguageEnum.fr
        ]
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

export default model('User', UserSchema);
