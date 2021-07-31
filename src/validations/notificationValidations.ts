const joi = require('joi');
const joiObjectId = require("joi-objectid")
const ObjectId = joiObjectId(joi);
import { NotificationTypeEnum } from "../models/Notification"



export const createNotificationValidator = function (req, res, next) {
    try {

        const bodySchema = joi.object().keys({
            notificationSubject: joi.object().keys({
                en: joi.string().required(),
                ar: joi.string().required(),
                fr: joi.string().required(),
                externalLocalization: joi.boolean()
            }).required(),
            notificationBody: joi.object().keys({
                en: joi.string().required(),
                ar: joi.string().required(),
                fr: joi.string().required(),
                externalLocalization: joi.boolean()
            }).required(),
            userId: ObjectId().allow(''),
            groupId: joi.when('userId', { is: '', then: ObjectId(), otherwise: ObjectId().allow('') }),
            notificationType: joi.string().required().valid([NotificationTypeEnum.EMAIL, NotificationTypeEnum.SMS, NotificationTypeEnum.PUSH_NOTIFICATION])
        }).xor('userId', 'groupId')

        const bodyValidation = joi.validate(req.body, bodySchema, { allowUnknown: false })
        const validationError = bodyValidation.error

        if (validationError) {
            return res.status(400).send({
                status: 'BAD_REQUEST',
                message: validationError.message
            });
        }
        return next()
    } catch (error) {
        console.error('validators --> createNotificationValidator.ts ', error);
        return res.status(400).json({
            status: 'SERVER_ERROR',
            message: 'Internal Server Error!'
        });
    }
};

