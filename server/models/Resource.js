import mongoose, { model } from "mongoose";

const resourceSchema = new mongoose.Schema({
    subject: {
        type: String
    },
    link:{
        type: String
    },
    group :{
        type : String
    },
    user : {
        type : mongoose.Types.ObjectId,
        ref : "User"
    }
});



export default model("Resource", resourceSchema);
//users