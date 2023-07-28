import mongoose, { model } from "mongoose";

const deadlineSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    date:{
        type: String,
        required: true
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



export default model("Deadline", deadlineSchema);
//users