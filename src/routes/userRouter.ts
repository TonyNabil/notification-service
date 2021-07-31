import express from "express"
const router = express.Router()
import { userController } from "../controller/userController"
import { createUserValidator, createGroupValidator, addUsersToGroupValidator } from "../validations/userValidations"


router.post('/user', createUserValidator, userController.createUser)
router.post('/group', createGroupValidator, userController.createGroup)
router.post('/userGroup', addUsersToGroupValidator, userController.addUsersToGroup)


export default router