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
    }
});



export default model("Announcement", announcementSchema);
//users