import User from "../models/User";
import Group from "../models/Group";
import User_Group from "../models/User_Group";

export default class UserService {

    async createUser(data) {
        const { name, phone, email, language } = data

        let existingUser: any = await User.findOne({ name, phone, email })
        if (existingUser)
            throw { statusCode: 400, status: "BAD_REQUEST", message: "USER_ALREADY_EXIST" }

        const user = new User({
            name,
            phone,
            email,
            language
        });

        await user.save();

        return user;
    }

    async createGroup(data) {
        const { name } = data

        let existingGroup: any = await Group.findOne({ name })
        if (existingGroup)
            throw { statusCode: 400, status: "BAD_REQUEST", message: "GROUP_ALREADY_EXIST" }

        const group = new Group({
            name
        });

        await group.save();

        return group;
    }

    async addUsersToGroup(data) {
        const { groupId, userIds } = data

        let existingUserGroup: any = await Group.findOne({ _id: groupId })
        if (!existingUserGroup)
            throw { statusCode: 400, status: "BAD_REQUEST", message: "NO_GROUP_FOUND" }

        let existingUsers: any = await User.find({ _id: { $in: userIds } })
        if (!existingUsers.length)
            return

        let userGroupArr = []
        for (const item of existingUsers) {
            let userGroup = new User_Group({
                groupId,
                userId: item._id
            }).save()
            userGroupArr.push(userGroup)
        }
        await Promise.all(userGroupArr)

        return
    }


}