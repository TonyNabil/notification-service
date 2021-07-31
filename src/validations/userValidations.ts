const joi = require('joi');
const joiObjectId = require("joi-objectid")
const ObjectId = joiObjectId(joi);
import { LanguageEnum } from "../models/User"



export const createUserValidator = function (req, res, next) {
    try {

        const bodySchema = joi.object().keys({
            name: joi.string().required(),
            phone: joi.string().min(9).max(20).required(),
            email: joi.string().email().required(),
            language: joi.string().required().valid([LanguageEnum.en, LanguageEnum.ar, LanguageEnum.fr])
        })

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
        console.error('validators --> createUserValidator.ts ', error);
        return res.status(400).json({
            status: 'SERVER_ERROR',
            message: 'Internal Server Error!'
        });
    }
};

export const createGroupValidator = function (req, res, next) {
    try {

        const bodySchema = joi.object().keys({
            name: joi.string().required(),
        })

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
        console.error('validators --> createGroupValidator.ts ', error);
        return res.status(400).json({
            status: 'SERVER_ERROR',
            message: 'Internal Server Error!'
        });
    }
};

export const addUsersToGroupValidator = function (req, res, next) {
    try {

        const bodySchema = joi.object().keys({
            userIds: joi.array().items(ObjectId().required()).required(),
            groupId: ObjectId().required()
        })

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
        console.error('validators --> addUsersToGroupValidator.ts ', error);
        return res.status(400).json({
            status: 'SERVER_ERROR',
            message: 'Internal Server Error!'
        });
    }
};

