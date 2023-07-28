import mongoose, { model } from "mongoose";

const announcementSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    subgroup :{
        type : String
    },
    group :{
        type : String
    },
    description :{
        type: String
    },
    user : {
        type : mongoose.Types.ObjectId,
        ref : "User"
    }
});



export default model("Announcement", announcementSchema);
//users