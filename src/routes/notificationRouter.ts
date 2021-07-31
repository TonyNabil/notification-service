import express from "express"
const router = express.Router()
import { notificationController } from "../controller/notificationController"
import { createNotificationValidator } from "../validations/notificationValidations"


router.post('/notification', createNotificationValidator, notificationController.createNotification)
router.get('/notification', notificationController.listNotifications)


export default router