import { Response, Request } from "express";
import UserService from "../services/UserService";
import { handleErrors } from "../util/utils"

class UserController {

    private userObject: UserService;

    constructor() {
        this.userObject = new UserService();
    }

    createUser = async (req: Request, res: Response) => {
        try {

            let result = await this.userObject.createUser(req.body);
            return res.send({ status: "OK", message: "SUCCESS", result });

        } catch (error) {
            console.log(error);
            const { statusCode, status, message } = handleErrors(error)
            return res.status(statusCode).json({
                status: status,
                message: message
            });
        }
    }

    createGroup = async (req: Request, res: Response) => {
        try {

            let result = await this.userObject.createGroup(req.body);
            return res.send({ status: "OK", message: "SUCCESS", result });

        } catch (error) {
            console.log(error);
            const { statusCode, status, message } = handleErrors(error)
            return res.status(statusCode).json({
                status: status,
                message: message
            });
        }
    }

    addUsersToGroup = async (req: Request, res: Response) => {
        try {

            await this.userObject.addUsersToGroup(req.body);
            return res.send({ status: "OK", message: "SUCCESS" });

        } catch (error) {
            console.log(error);
            const { statusCode, status, message } = handleErrors(error)
            return res.status(statusCode).json({
                status: status,
                message: message
            });
        }
    }

}

export const userController = new UserController();