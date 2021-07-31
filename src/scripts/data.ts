/* jshint esversion: 8 */
import mongoose from "mongoose";
import User from "../models/User";
import Group from "../models/Group";
import User_Group from "../models/User_Group";
mongoose.set("useNewUrlParser", true); // use the new MongoDB driver connection string parser
mongoose.set("useCreateIndex", true);  // use the MongoDB driver createIndex() function instead of ensureIndex()
mongoose.set("useUnifiedTopology", true); // use the new MongoDB topology engine
mongoose.set("useFindAndModify", false); // use the MongoDB driver findOneAndUpdate() instead of findAndModify()

/*
* MongoDB server configuration
*/
const uri = "mongodb://localhost:27017/notifications";
mongoose.connect(uri, async (error) => {
    if (error) {
        return console.error("MongoDB not connected!", error);
    }

    console.log("MongoDB client connected!");
    await createUsers();



});


async function createUsers() {

    mongoose.connection.dropDatabase();
    let users = [
        {
            name: "user_1",
            phone: "01273478941",
            email: "user_1@hotmail.com",
            language: "en"
        },
        {
            name: "user_2",
            phone: "01273478942",
            email: "user_2@hotmail.com",
            language: "ar"
        },
        {
            name: "user_3",
            phone: "01273478943",
            email: "user_3@hotmail.com",
            language: "fr"
        },
        {
            name: "user_4",
            phone: "01273478944",
            email: "user_4@hotmail.com",
            language: "en"
        }
    ]
    await User.insertMany(users)

    let dbUsers: any = await User.find()

    let Groups = [
        {
            name: "EGYPTIANS"
        },
        {
            name: "NON_EGYPTIANS"
        }
    ]
    await Group.insertMany(Groups)
    let egyptianGroup = await Group.findOne({ name: "EGYPTIANS" })

    for (let item of dbUsers) {
        await User_Group.collection.insertOne({
            userId: item._id,
            groupId: egyptianGroup._id
        })
    }


    console.log("finshed");


}
