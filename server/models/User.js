import mongoose, { model } from "mongoose";
import { Schema } from "mongoose";
import jwt from 'jsonwebtoken';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
    },
    password :{
        type: String,
    },
    role:{
        type: String
    },
    subgroup :{
        type: String, 
    },
    group :{
        type: String
    },
    announcementsGrp:[{
        type : mongoose.Types.ObjectId,
        ref: "Announcement"
    }],
    announcementsSubGrp:[{
        type : mongoose.Types.ObjectId,
        ref: "Announcement"
    }],
    deadlines:[{
        type : mongoose.Types.ObjectId,
        ref: "Deadline"
    }],
    exams:[{
        type : mongoose.Types.ObjectId,
        ref: "Exam"
    }],
    resources:[{
        type : mongoose.Types.ObjectId,
        ref: "Resource"
    }],
    tokens : [
        {
            token:{
                type:String,
                required :true
            }
        }
    ],
});


userSchema.methods.generateAuthToken = async function(){
    try{
        let token = jwt.sign({_id: this._id}, process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({token : token});
        await this.save();
        // console.log(token);
        return token;
    }catch(err){
        console.log(err);
    }
}



export default model("User", userSchema);
//users